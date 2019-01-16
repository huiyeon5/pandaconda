import os
from flask import Flask, render_template, jsonify, json, request, session, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from sqlalchemy import text
from . import check_headers

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

    # Default Render
    @app.route('/')
    def index():
        return render_template('login.html')

    # Migrating the db.Models from the Models.py file to MySQL
    migrate = Migrate(app, db)

    from app import models
    from app.models import User, UserData

    # Render Homepage
    @app.route("/home/")
    def home():
        return render_template('home.html')

    @app.route("/upload/")
    def upload():
        return render_template('upload.html')

    @app.route("/visualisation/")
    def visualisation():
        return render_template('visualisation.html')

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
    @login_required
    def logout():
        logout_user()
        return jsonify({
            'status': 200
        })

    @app.route('/getSession_api')  # API -> get Current User if available
    def getSession():
        if current_user.is_authenticated:
            return jsonify({
                'status': 200,
                'current_user': {
                    'name': current_user.fullname,
                    'email': current_user.email,
                    'company': current_user.company
                }
            })
        else:
            return jsonify({'status': 400})

    @app.route('/upload_api', methods=['GET', 'POST'])  # API for upload
    def upload_file():
        if current_user.is_authenticated:
            if request.method == 'POST':
                # check if the post request has the file part
                print(request.files)
                if 'file' not in request.files:
                    flash('No file part')
                    return "Error"
                file = request.files['file']
                # if user does not select file, browser also
                # submit an empty part without filename
                if file.filename == '':
                    flash('No selected file')
                    return "Error2"
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    file.save(os.path.join(
                        app.config['UPLOAD_FOLDER'], filename))

                    value = check_headers.suggest_headers(
                        'uploads/' + filename)
                    if value['status'] == 400:
                        return value
                    else:
                        sql = f'CREATE TABLE {filename[0:len(filename)-4]}'
                        userData = UserData(data_name=filename[0 : len(filename) - 4],user_id=current_user.id)
                        db.session.add(userData)
                        db.session.commit()
                        if os.path.exists(filename):
                            os.remove(filename)

            else:
                return jsonify({'status': 400, 'error': 'Use POST request'})
        else:
            return jsonify({})


# ========================================================= API END HERE ================================================

    return app
