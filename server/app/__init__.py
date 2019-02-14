import os
from flask import Flask, render_template, jsonify, json, request, session, Blueprint, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from sqlalchemy import text
from werkzeug.utils import secure_filename
from . import check_headers
import datetime
import pandas as pd

# local imports
from config import app_config

# db variable initialization
db = SQLAlchemy()

# Creating App

def create_app(config_name):
    app = Flask(__name__, static_folder='../../static/dist',
                template_folder='../../static', instance_relative_config=True)

    # App Configurations
    app.config.from_pyfile('config.cfg', silent=True)
    # app.config["CUSTOM_STATIC_PATH"] = "../../static"

    blueprint = Blueprint(
        'site', __name__, static_folder='../../static', template_folder='../../static')
    app.register_blueprint(blueprint)

    # Database Setup
    db.init_app(app)

    # Login Manager Set Up
    login_manager = LoginManager()
    login_manager.init_app(app)

    # Default User loader
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.filter_by(id=user_id).first()
        
    @app.route("/")
    def index():
        if not current_user.is_authenticated:
            return redirect(url_for('login_r'))
        else:
            return render_template('home.html')

    # Default Render
    @app.route('/login')
    def login_r():
        if current_user.is_authenticated:
            return redirect('/')
        else:
            return render_template('login.html')

    # Migrating the db.Models from the Models.py file to MySQL
    migrate = Migrate(app, db)

    from app import models
    from app.models import User, UserData, GroupValidHeaders, UserVisualization, Group, GroupMember, GroupDataset

    # Render Homepage

    @app.route("/upload/")
    def upload():
        if not current_user.is_authenticated:
            return redirect(url_for('login_r'))
        else:
            return render_template('upload.html')

    @app.route("/visualisation/")
    def visualisation():
        if not current_user.is_authenticated:
            return redirect(url_for('login_r'))
        else:
            return render_template('visualisation.html')

    @app.route("/manage/")
    def manage():
        if not current_user.is_authenticated:
            return redirect(url_for('login_r'))
        else:
            return render_template('manage.html')

    @app.route('/signup')
    def signup_r():
        return render_template('signup.html')

    @app.route('/upload/edit_table')
    def edit_table():
        if current_user.is_authenticated:
            return render_template('editTable.html')
        else:
            redirect(url_for('login_r'))
    
    # upload file settings
    UPLOAD_FOLDER = 'app/uploads'
    ALLOWED_EXTENSIONS = set(['txt', 'csv'])

    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

    def allowed_file(filename):
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
# ========================================================= API START HERE ================================================

    @app.route('/register_api', methods=['POST'])  # API - User Registration
    def register():
        req_body = request.get_json()
        email = req_body['email']
        password = req_body['password']
        firstname = req_body['firstName']
        lastname = req_body['lastName']

        emailExist = User.query.filter_by(email=email).first()
        if emailExist:
            return jsonify({'status': 400, 'error': 'Email Exists'})
        else:
            user = models.User(email=email, fullname=(
                firstname+' '+lastname), password=password)
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return jsonify({'status': 200})

    @app.route('/login_api', methods=['POST'])  # API -> User Login
    def login():
        req_body = request.get_json()
        email = req_body['email']
        password = req_body['password']
        if email == '' or password == '':
            return jsonify({'status': 400})
        user = User.query.filter_by(email=email).first()
        if user:
            check = user.verify_password(password)
            if check:
                login_user(user)
                return jsonify({'status': 200})

        return jsonify({'status': 400})

    @app.route('/logout_api')  # API -> User Log Out
    #@login_required
    def logout():
        logout_user()
        # return jsonify({
        #     'status': 200'
        # })
        return redirect(url_for('login_r'))

    @app.route('/getSession_api')  # API -> get Current User if available
    def getSession():
        if current_user.is_authenticated:
            return jsonify({
                'status': 200,
                'current_user': {
                    'name': current_user.fullname,
                    'email': current_user.email,
                }
            })
        else:
            return jsonify({'status': 400})



    @app.route('/upload_api', methods=['GET', 'POST'])  # API for upload
    def upload_file():
        # if current_user.is_authenticated:
        print("here2")
        if 'editData' in session:
            session.pop('editData')
        if request.method == 'POST':
            # check if the post request has the file part
            print(request.files)
            if 'file' not in request.files:
                # flash('No file part')
                return jsonify({'status':402, 'error':'No File Part'})
            file = request.files['file']
            # if user does not select file, browser also
            # submit an empty part without filename
            if file.filename == '':
                # flash('No selected file')
                return jsonify({'status':401, 'error':'No Selected File'})
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                session['filePath'] = 'app/uploads/' + filename
                session['fileName'] = filename
                valid = GroupValidHeaders.query.filter_by(group_id=current_user.group_id).all()
                valid_headers=[]
                header_types ={}
                for row in valid:
                    valid_headers.append(row.header_name)
                    header_types[row.header_name] = row.data_type
                print(filename)
                value = json.loads(check_headers.suggest_headers('app/uploads/' + filename, valid_headers, header_types))
                # print("==VALUE OUPUT==")
                # print(value)
                if value['status'] == 400:
                    session['editData'] = value
                    return jsonify(value)
                else:
                    f = filename[0:len(filename) - 4]+ "_" +str(current_user.id)
                    has = UserData.query.filter_by(data_name=f).first()
                    # print("==HAS VALUE==")
                    # print(has)
                    if has is None:
                        header = "("
                        headerNoType ="("
                        headerOrder = []
                        dateIndex = []
                        d = 0
                        for k,v in value['headers'].items():
                            header = header + k + " "
                            headerNoType += k + ","
                            headerOrder.append(k)
                            if(v == 'int'):
                                header = header + "INT"
                            elif(v == 'string'):
                                header = header + "VARCHAR(MAX)"
                            elif(v == 'date'):
                                header = header + "DATETIME"
                                dateIndex.append(d)
                            elif(v == 'double'):
                                header = header + "FLOAT"
                            header = header + ','
                            d = d + 1
                        header = header[0:len(header)-1] +')'

                        sql = f'CREATE TABLE {filename[0:len(filename)-4]+"_"+str(current_user.id)} {header}'

                        insertSQL = f'INSERT INTO {filename[0:len(filename)-4]+"_"+str(current_user.id)} {headerNoType[0: len(headerNoType) - 1] + ")"} VALUES '
                        v=""
                        for item in json.loads(value['data']):
                            v = v + "("
                            for el in range(len(headerOrder)):
                                i = item[headerOrder[el]]
                                if i is None:
                                    v = v + "NULL,"
                                else:
                                    if el in dateIndex:
                                        i = convertToDate(i)
                                        if i is None:
                                            v = v + "NULL,"
                                        else:
                                            v = v + "'" +str(i) + "',"
                                    else:
                                        v = v + "'" +str(i) + "',"
                            v = v[0: len(v) - 1] + "),"

                        insertSQL += v[0:len(v) - 1] +";"
                        db.engine.execute(text(sql))
                        db.engine.execute(text(insertSQL))
                        userData = UserData(data_name=f, user_id=current_user.id, upload_date=datetime.datetime.now())
                        db.session.add(userData)
                        db.session.commit()
                        # if os.path.join(app.config['UPLOAD_FOLDER']).exists(filename):
                        #     os.path.join(app.config['UPLOAD_FOLDER']).remove(filename)
                        return jsonify({"status":200})
                    else:
                        return jsonify({"status":400, "error": "Dataset exists"})

        else:
            return jsonify({'status': 404, 'error': 'Use POST request'})
        # else:
        #     return jsonify({})
    
    
    @app.route('/get_all_dataset_api')
    def get_all_dataset_api():
        if current_user.is_authenticated:
            c_id = current_user.id
            ds_names = UserData.query.filter_by(user_id=c_id).order_by(UserData.upload_date.desc()).all()
            returnList =[]
            for dd in range(len(ds_names)):
                d = ds_names[dd]
                temp = {}
                temp["id"] = f'dataset-name-{dd+1}'
                temp["name"] = d.data_name[0: d.data_name.rfind("_")]
                returnList.append(temp)
                print(returnList)
            return jsonify({'datasetNames':returnList})
        else:
            return jsonify({'status':400})


    @app.route('/get_headers_api', methods=['POST'])
    def get_headers_api():
        if current_user.is_authenticated:
            req = request.get_json()
            dataset = req['selectedData'] + "_" + str(current_user.id)
            headers = db.engine.execute(f'Show columns from {dataset}')
            head_list = [row[0] for row in headers]
            return jsonify({'status':200, 'headers': head_list})
        return jsonify({'status':400})

    @app.route('/get_headers_unique_values_api', methods=['POST'])
    def get_headers_unique_values_api():
        if current_user.is_authenticated:      
            req = request.get_json()
            # print("Request", req)
            dataset = req['dataset'] + "_" + str(current_user.id)
            # print("DATASET::: ", dataset)
            col = req['column']
            # print("COLUMN::: ", col)
            sql_data = db.engine.execute(f'Select distinct {col} from {dataset} ORDER BY {col} ASC')
            result = []
            # print("DATA::: ", sql_data)
            for row in sql_data:
                result.append(row[0])
            return jsonify({'status':200, 'data': result})
        return jsonify({'status':400})
    
    @app.route('/viz_filter_api', methods=["POST"])
    def viz_filter_api():
        
        def sortConvert(direction):
            return {
                "ascending": "ASC",
                "descending": "DESC"
            }[direction]
        
        def fixDate(dateStr):
            dateObj = { 'Jan' : 1, 'Feb' : 2, 'Mar' : 3, 'Apr' : 4, 'May' : 5, 'Jun' : 6, 'Jul' : 7, 'Aug' : 8, 'Sep' : 9, 'Oct' : 10, 'Nov' : 11, 'Dec' : 12}
            dateList = dateStr.split(" ")
            date = datetime.date(int(dateList[3]), int(dateObj[dateList[2]]), int(dateList[1]))
            return date

        
        if current_user.is_authenticated:
            valid = GroupValidHeaders.query.filter_by(group_id=current_user.group_id).all()
            header_types ={}
            for row in valid:
                header_types[row.header_name] = row.data_type

            req = request.get_json()

            dataset = req['selectedData'] + "_" + str(current_user.id)
            x_axis = req['headers'][0]
            y_axis = req['headers'][1]
            aggre = req['aggregate']
            filters = req['filter']
            
            conditions = ""
            if len(filters) > 0:
                conditions = "WHERE "
                for f in filters:
                    if header_types[f['column']] == 'date':
                        val = fixDate(f['value'])
                        print(val)
                        conditions += f['column'] + " " + f['condition'] + " '" + str(val) + "' AND "
                    else:
                        conditions += f['column'] + " " + f['condition'] + " '" + f['value'] + "' AND "
                conditions = conditions[0: len(conditions) - 4]
            else:
                conditions = ""


            orderBy = ""
            if (req['topKSort'] is not None):
                topKSort = sortConvert(req['topKSort'])
                orderBy = f'ORDER BY y_axis {topKSort}, {x_axis} ASC'
            else:
                orderBy = f'ORDER BY {x_axis} ASC'


            limitResult = ""
            if (req['topKLimit'] is not None):
                topKLimit = req['topKLimit']
                limitResult = f'LIMIT {topKLimit}'
            else:
                limitResult = ""

            sql = f'SELECT {x_axis}, {aggre}({y_axis}) as y_axis FROM {dataset} {conditions} GROUP BY {x_axis} {orderBy} {limitResult}'

            returnSQL = db.engine.execute(sql)
            returnDict = {}
            returnDict["xaxis"] = []
            returnDict["yaxis"] = []
            for row in returnSQL:
                returnDict["xaxis"].append(str(row[0]))
                returnDict["yaxis"].append(float(row[1]))
            
            if len(returnDict["xaxis"]) == 0 or len(returnDict["yaxis"]) == 0:
                return jsonify({'status':400, 'error': "Filters Invalid"})
            return jsonify({'data': returnDict, 'status': 200})

        return jsonify({'status':400})
    
    @app.route("/update_api")
    def update_api():
        print("here")
        if 'editData' not in session or session['editData'] == None:
            return jsonify({"status":500})
        else:
            value = session.get('editData')
            return jsonify(value)

    def convertToDate(i):
        dateList = i.split("/")
        if len(dateList) != 3:
            return None
        date = datetime.date(int(dateList[2]), int(dateList[1]), int(dateList[0]))
        return date

    @app.route('/finalize_headers_api', methods=['POST'])  # API for the final headers
    def finalize_headers_api():
        headers_dict = request.get_json()
        filePath = session.get('filePath')
        filename = session.get('fileName')

        df = pd.read_csv(filePath)

        print("Header")
        print(headers_dict)
        
        to_drop = []
        rename_dict = {}

        for key, value in headers_dict.items():
            if len(value) == 0:
                to_drop.append(key)
            else:
                rename_dict[key] = value

        df.drop(columns=to_drop, axis=1, inplace=True)
        df.rename(columns=rename_dict, inplace=True)

        date_columns = list(df.select_dtypes(include=['object']).columns)

        for column in date_columns:
            df[column] = pd.to_datetime(df[column], format = "%d/%m/%y")

        df.to_sql(name = filename[0:len(filename)-4]+"_"+str(current_user.id), con=db.engine, index=False)

        userData = UserData(data_name=filename[0:len(filename)-4]+"_"+str(current_user.id), user_id=current_user.id, upload_date=datetime.datetime.now())
        db.session.add(userData)
        db.session.commit()

        return jsonify({'status':200})

    @app.route('/view_data_api', methods=["GET"])
    def view_data_api():
        filePath = session.get('filePath')
        filename = session.get('fileName')

        df = pd.read_csv(filePath)

        df = df.head()

        dic = {}
        s = [list(l) for l in zip(*df.values)]
        i = 0
        for row in s:
            dic[df.columns[i]] = row
            i = i + 1

        toReturn = [(k,v) for k,v in dic.items()]
        return jsonify({'data': toReturn})

    @app.route('/save_visualization', methods=["POST"])
    def save_visualization():
        userID = current_user.id
        userViz = UserVisualization(upload_date=datetime.datetime.now(), configs=request.get_json(),user_id=userID)
        db.session.add(userViz)
        db.session.commit()
        return jsonify({'status':200})

    @app.route('/get_all_saved_viz')
    def get_all_saved_viz():
        userID = current_user.id
        res = UserVisualization.query.filter_by(user_id=userID).order_by(UserVisualization.upload_date.desc()).all()
        returnList = []
        print(res)
        for item in res:
            temp = {}
            temp[str(item.upload_date)] = item.configs
            returnList.append(temp)
        
        return jsonify({'data':returnList, 'status': 200})

    @app.route('/has_group')
    def has_group():
        if(current_user.group_id is not None):
            returnObj = {}
            returnObj['status'] = 200
            group = Group.query.filter_by(id=current_user.group_id).one()
            returnObj['managerId'] = group.manager_id
            members = GroupMember.query.filter_by(group_id=current_user.group_id).all()
            returnObj['numMember'] = len(members)
            returnObj['group_id'] = current_user.group_id
            print(returnObj)
            return jsonify(returnObj)
        return jsonify({'status':400})

    @app.route('/get_manager_info',methods=["POST"])
    def get_manager_info():
        dic = request.get_json()
        manager_id = dic['manager_id']
        man = User.query.filter_by(id=manager_id).one()
        returnDict = {}
        returnDict['name'] = man.fullname
        returnDict['email'] = man.email
        returnDict['status'] = 200
        return jsonify(returnDict)
        
    @app.route('/get_group_user_dataset')
    def get_group_user_dataset():
        if current_user.is_authenticated:
            c_id = current_user.id
            g_id = current_user.group_id
            ds_names = UserData.query.filter_by(user_id=c_id).order_by(UserData.upload_date.desc()).all()
            gds_names = GroupDataset.query.filter_by(group_id=g_id).order_by(GroupDataset.upload_date.desc()).all()
            yourList =[]
            gList = []
            for dd in range(len(ds_names)):
                d = ds_names[dd]
                yourList.append(d.data_name[0: d.data_name.rfind("_")])

            for dd in range(len(gds_names)):
                d = gds_names[dd]
                gList.append(d.data_name[0:d.data_name.rfind("_")])

            print({'yourData':yourList,'groupData':gList})
            return jsonify({'yourData':yourList,'groupData':gList})
        else:
            return jsonify({'status':400})

    @app.route('/push_to_group', methods=["post"])
    def push_to_group():
        d = request.get_json()
        dsname = d['data_name']+"_" + str(current_user.id)
        print(dsname)
        has = GroupDataset.query.filter_by(data_name=dsname).first()
        if has is None:
            g_id = current_user.group_id
            groudDS = GroupDataset(group_id=g_id,data_name=dsname, upload_date=datetime.datetime.now())
            db.session.add(groudDS)
            db.session.commit()
            return jsonify({'status':200})
        else:
            return jsonify({'status':400})

    @app.route('/get_all_groups')
    def get_all_groups():
        groups = Group.query.all()
        returnList = []
        for data in groups:
            temp = {}
            temp['id'] = data.id
            temp['manager_id'] = data.manager_id
            returnList.append(temp)

        return jsonify({'data':returnList, 'status':200})


# ========================================================= API END HERE ================================================

    return app