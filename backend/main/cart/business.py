from main.connections import *
from main.common import *
from flask import current_app
import uuid,os,pymongo

def create_new_cart(data):
    add_item=collection_3.insert_one(data)
    inserted_item = collection_3.find_one({"_id": add_item.inserted_id})
    return inserted_item

def get_cart_data(data):
    user_id=data.get("user_id",None)
    if user_id is None:
        raise Exception("User Id is needed")
    cart_data=collection_3.find_one({"user_data._id":user_id})
    return cart_data

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
    print('here')
    if id is None:
        raise Exception("Cart Id is required")
    cart_data=collection_3.find_one_and_delete({"_id":ObjectId(id)})
    return cart_data

def search_cart_data(data):
    item_id=data.get("item_id",None)
    if item_id is None:
        raise Exception("Item Id is required")
    cart_data=collection_3.find_one({"items_data._id":item_id})
    if cart_data is None:
        return False;
    return True;