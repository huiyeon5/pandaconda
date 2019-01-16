from werkzeug.security import generate_password_hash,check_password_hash
from flask_login import UserMixin
from app import db

class User(UserMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    fullname = db.Column(db.String(80), nullable=False)
    company = db.Column(db.String(80), nullable=False)
    group_id = db.Column(db.Integer)

    @property
    def password(self):
        raise AttributeError('Password is not a readable Attribute')
     
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return '<User %r>' % self.id


class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_ids = db.Column(db.Integer)
    manager_id = db.Column(db.Integer)

    def __repr__(self):
        return '<Group %d, Manager %d>' % self.id, self.manager_id


class UserData(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    data_name = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<UserData %d %s>' % self.id, self.data_name