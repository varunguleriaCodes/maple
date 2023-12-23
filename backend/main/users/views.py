from flask_restful import Resource
from flask import request
from main.users.business import *
from main.common import *
from flask_jwt_extended import jwt_required
class UserRegister(Resource):
    def post(self):
      try:
          request_data=request.get_json()
          print(request_data)
          data=register_new_user(request_data)
          response={"status":True,"message":"User Created Successfully with ID {}".format(data)}
          return create_custom_response(response,200)
      except Exception as e:
          response={"status":False,"message":"Error:{}".format(str(e))}
          return create_custom_response(response,400)
    
class UserLogin(Resource):
    def post(self):
        try:
            request_data=request.get_json()
            data=validate_user(request_data)
            response={"status":True,"data":data}
            return create_custom_response(response,200)
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400)
              
class User(Resource):
    @jwt_required()
    def get(self,id):
       try:
           data=get_user_details(id)
           response={"status":True,"data":data}
           return create_custom_response(response,200)
       except Exception as e:
           response={"status":False,"message":"Error:{}".format(str(e))}
           return create_custom_response(response,400) 
    
    @jwt_required()
    def delete(self,id):
        try:
            data=delete_user_details(id)
            response={"status":True,"message":"User Deleted Successfully"}
            return create_custom_response(response,200)
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400)
    
    @jwt_required() 
    def put(self,id):
        try:
            requested_data=request.get_json()
            data=update_user_details(requested_data,id)
            response={"status":True,"updated_user":data}
            return create_custom_response(response,200)
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400) 
