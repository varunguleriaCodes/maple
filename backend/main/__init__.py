from flask import Flask
from flask_jwt_extended import JWTManager
from main.connections import *
from main.users.views import *
def create_app():
    app=Flask(__name__)
    app.config['JWT_SECRET_KEY']="secret_key"
    jwt=JWTManager(app)
    return app;
    