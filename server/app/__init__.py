from flask import Flask, render_template,jsonify,json, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, login_user, login_required,logout_user, current_user

# local imports
from config import app_config

# db variable initialization
db = SQLAlchemy()

# Creating App
def create_app(config_name):
    app = Flask(__name__, static_folder='../../static/dist', template_folder='../../static', instance_relative_config=True)

    # App Configurations
    app.config.from_pyfile('config.cfg', silent=True)

    # Database Setup
    db.init_app(app)

    # Login Manager Set Up
    login_manager = LoginManager()  
    login_manager.init_app(app)

    # Default User loader
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.filter_by(id=user_id).first()

    #Default Render
    @app.route('/')
    def index():
        return render_template('index.html')

        
    migrate = Migrate(app, db) # Migrating the db.Models from the Models.py file to MySQL

    from app import models
    from app.models import User


# ========================================================= API START HERE ================================================

    @app.route('/register_api', methods = ['POST']) # API - User Registration 
    def register():
        req_body = request.get_json()
        email = req_body['email']
        password = req_body['password']
        firstname = req_body['firstname']
        lastname = req_body['lastname']
        company = req_body['company']

        emailExist = User.query.filter_by(email=email).first()
        if emailExist:
            return jsonify({'status': 400,'error': 'Email Exists'})
        else:
            user = models.User(email=email, fullname=(firstname+' '+lastname), company=company, password=password)
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return jsonify({'status': 200})


    @app.route('/login_api', methods = ['POST']) # API -> User Login
    def login():
        req_body = request.get_json()
        email = req_body['email']
        password = req_body['password']
        user = User.query.filter_by(email='huiyeon@gmail.com').first()
        if user:
            check = user.verify_password(password)
            if check:
                login_user(user)
                return jsonify({'status':200})

        return jsonify({'status':400})

    
    @app.route('/logout_api') # API -> User Log Out
    @login_required
    def logout():
        logout_user()
        return jsonify({
            'status': 200
        })

    @app.route('/getSession_api') # API -> get Current User if available
    def getSession():
        if current_user.is_authenticated:
            return jsonify({
                'status' : 200,
                'current_user': {
                    'name': current_user.fullname,
                    'email' : current_user.email,
                    'company': current_user.company
                }
            })
        else:
            return jsonify({'status' : 400})


    @app.route('/uploadData_api')
    def uploadData():
        # Check for Authenticated - Check for Duplicate Table name - Call Rain's Edit Distance - db.engine.execute('sql')
        pass
        
# ========================================================= API END HERE ================================================
    
    return app