from flask_restful import Resource
from flask import request
from main.items.business import *
from main.common import *
from flask_jwt_extended import jwt_required

class Items(Resource):
    def post(self):
        print('1111111111111111111111111111')
        try:
            requested_data=request.form.to_dict()
            print('121', request.files['image'])
            data=create_item(requested_data,request.files['image'])
            response={"status":True,"message":"Item Created Successfully"}
            return create_custom_response(response,200)
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400)
    
    def get(self):
        try:
            print('1111111111111')
            data=get_all_items()
            response={"status":True,"data":data}
            return create_custom_response(response,200)
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400)

class Item(Resource):
    def get(self,id):
        try:
            data=get_item_data(id)
            response={"status":True,"data":data}
            return create_custom_response(response,200) 
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400) 

    def delete(self,id):
        try:
            data=delete_item_data(id)
            response={"status":True,"message":"Item Deleted Successfully"}
            return create_custom_response(response,200)
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400)  

    def put(self,id):
        try:
            requested_data=request.form.to_dict()
            data=update_item_data(requested_data,request.files['image'],id)
            response={"status":True,"message":"Item Updated Successfully"}
            return create_custom_response(response,200)
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400)         
        
class Filter(Resource):
  def get(self):
        try:  
            requested_filters=request.args.to_dict()
            print('63',requested_filters)
            data=get_filters_data(requested_filters)
            response={"status":True,"data":data}
            return create_custom_response(response,200)          
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400) 