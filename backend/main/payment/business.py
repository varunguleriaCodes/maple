import bcrypt,pymongo
from main.common import *
from main.cart.business import delete_cart_data
from main.connections import *
from datetime import datetime
def calculate_order_amount(data):
    amount=0
    for item in data:
          amount+=int(item.get('quantity',0))*int(item.get('new_price',0))
    return amount
     
def create_payment(data):
        amount=calculate_order_amount(data['items_data']),
        delete_cart_data_id=data.get("_id",None)
        print(delete_cart_data_id)
        if delete_cart_data_id is None:
              raise Exception("Cart Id is required")
        data['total_amount']=amount;
        data['status']="success"
        data['cart_id']=delete_cart_data_id
        data['createdOn']=str(datetime.utcnow())
        if '_id' in data:
             data.pop('_id')
        print('here',data)
        add_data=collection_4.insert_one(data)
        delete_cart_data({"_id":delete_cart_data_id})
        print(add_data.inserted_id)
        inserted_order = collection_4.find_one({"_id": ObjectId(add_data.inserted_id)})
        inserted_order['_id']=str(inserted_order['_id'])
        return inserted_order

def get_ordered_data(order_id):
    if order_id is None:
          raise Exception("Order Id is required")
    order_data=collection_4.find_one({"_id":ObjectId(order_id)})
    order_data["_id"]=str(order_data["_id"])
    return order_data

def get_all_orders_for_an_user(user_id):
   if user_id is None:
        raise Exception("User Id not found")
   order_data=collection_4.find({"user_data._id":user_id})
   return list(order_data)