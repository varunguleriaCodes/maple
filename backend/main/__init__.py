from flask import Flask
from flask_jwt_extended import JWTManager
from main.connections import *
from main.users.views import *
from main.items.views import *
from main.cart.views import *
from main.payment.views import *
from flask_restful import Api
from flask_cors import CORS
def create_app():
    app=Flask(__name__)
    app.config['JWT_SECRET_KEY']="secret_key"
    app.config['JWT_ACCESS_TOKEN_EXPIRES']=3600
    app.config['AZURE_STORAGE_CONNECTION_STRING']="Connection String"
    app.config['CONTAINER_NAME']="Container Name"
    

    CORS(app)
    jwt=JWTManager(app)
    api=Api(app)

    api.add_resource(UserRegister,"/register")
    api.add_resource(UserLogin,"/login")
    api.add_resource(User,'/user/<id>')
    api.add_resource(Items,'/items')
    api.add_resource(Item,"/item/<id>")
    api.add_resource(Filter,"/items-filter")
    api.add_resource(Cart,'/cart')
    api.add_resource(SearchCart,'/search-cart')
    api.add_resource(Payment,'/create-payment')
    api.add_resource(Order,'/get_order_data/<id>')
    api.add_resource(AllOrders,'/all_order_details_user/<id>')
    return app;
    