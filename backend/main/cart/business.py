from main.connections import *
from main.common import *
from flask import current_app
import uuid,os,pymongo

def create_new_cart(data):
    add_item=collection_3.insert_one(data)
    return add_item

def get_cart_data(data):
    user_id=data.get("user_id",None)
    if user_id is None:
        raise Exception("User Id is needed")
    cart_data=collection_3.find({"user_id":user_id})
    return list(cart_data)

def update_cart_data(data):
    id=data.get("_id",None)
    if id is None:
        raise Exception("Cart Id is required")
    print(id)
    data['_id']=ObjectId(data['_id'])
    cart_data=collection_3.find_one_and_update(
        {"_id": ObjectId(id)},        
        {"$set": data},
        return_document=pymongo.ReturnDocument.AFTER 
        )
    print(cart_data)
    return cart_data

def delete_cart_data(data):
    id=data.get("_id",None)
    if id is None:
        raise Exception("Cart Id is required")
    cart_data=collection_3.find_one_and_delete({"_id":ObjectId(id)})
    return cart_data