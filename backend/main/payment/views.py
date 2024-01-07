from flask import Flask,make_response,render_template,request
from flask_restful import Resource
from main.common import *
from main.payment.business import *



class Payment(Resource):
    def post(self):
        try:
            requested_data=request.get_json()
            print(requested_data)
            data=create_payment(requested_data)
            response={"status":True,"data":data}
            print('15',response)
            return create_custom_response(response,200)      
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400)            
        
class Order(Resource):
    def get(self,id):
        try:
            order_details=get_ordered_data(id)
            response={"status":True,"data":order_details}
            return create_custom_response(response,200)             
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400)  
        

class AllOrders(Resource):
    def get(self,id):
        try:
            order_data=get_all_orders_for_an_user(id)
            response={"status":True,"data":order_data}
            return create_custom_response(response,200)             
        except Exception as e:
            response={"status":False,"message":"Error:{}".format(str(e))}
            return create_custom_response(response,400) 