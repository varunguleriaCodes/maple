from main.connections import *
from flask_jwt_extended import create_access_token
import bcrypt,pymongo
from main.common import *
def hash_password(password):
    byte_encoded_password=password.encode('utf-8')
    return bcrypt.hashpw(byte_encoded_password,bcrypt.gensalt())

def register_new_user(request_data):
    user_email=request_data['email']
    is_user_already_present=collection_1.find_one({"email":user_email})
    if is_user_already_present is not None:
        raise Exception("User with this Email Id Already Present.")
    request_data['password']=hash_password(request_data['password']);
    add_user=collection_1.insert_one(request_data)
    print(add_user)
    return str(add_user.inserted_id)

def validate_user(request_data):
    user_email=request_data['email']
    user=collection_1.find_one({'email':user_email})
    if user is None:
        raise Exception("Please Register, no user with this email found.")
    byte_encoded_password=request_data['password'].encode("utf-8")
    password_match=bcrypt.checkpw(byte_encoded_password,user['password'])
    response_data = {key: value for key, value in user.items() if key != "password"}
    if password_match:
        access_token=create_access_token(identity=str(user['_id']))
        return {"user_data":response_data,"access_token":access_token}

def get_user_details(id):
    user=collection_1.find_one({"_id":ObjectId(id)})
    if user is None:
        raise Exception("No such user Present")
    user_data={key: value for key, value in user.items() if key != "password"}
    return user_data

def delete_user_details(id):
    user=collection_1.find_one({"_id":ObjectId(id)})
    if user is None:
        raise Exception("No such user Present")
    delete_user=collection_1.find_one_and_delete({"_id":ObjectId(id)})
    return True

def update_user_details(data,id):
    user=collection_1.find_one({"_id":ObjectId(id)})
    if user is None:
        raise Exception("No such user Present")
    update_user=collection_1.find_one_and_update(
          {"_id": ObjectId(id)},        
          {"$set": data},
          return_document=pymongo.ReturnDocument.AFTER 
      )
    user_data={key: value for key, value in update_user.items() if key != "password"}
    return user_data