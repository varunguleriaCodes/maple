from flask_restful import Resource
from flask import request
from main.cart.business import *
from main.common import *
from flask_jwt_extended import jwt_required
from flask import current_app
class Cart(Resource):
    def post(self):
        try:
            cart_data=request.get_json()
            data=create_new_cart(cart_data)
            response={"status":True,"data":data}
            return create_custom_response(response,200)            
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400) 
        
    def get(self):
        try:
            filter=request.args.to_dict()
            data=get_cart_data(filter)
            response={"status":True,"data":data}
            return create_custom_response(response,200) 
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400) 
        
    def put(self):
        try:
            filter=request.args.to_dict()
            data=update_cart_data(request.get_json())
            response={"status":True,"data":data}
            return create_custom_response(response,200) 
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400) 
        
    def delete(self):
        try:
            filter=request.args.to_dict()
            data=delete_cart_data(filter)
            response={"status":True,"data":data}
            return create_custom_response(response,200)
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400) 

class SearchCart(Resource):
    def get(self):
        try:
            filter=request.args.to_dict()
            data=search_cart_data(filter)
            response={"status":True,"already_present":data}
            return create_custom_response(response,200)
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400) 