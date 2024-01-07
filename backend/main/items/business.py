from main.connections import *
from main.common import *
from flask import current_app
import uuid,os,pymongo
from azure.storage.blob import BlobServiceClient, generate_blob_sas, BlobSasPermissions
from datetime import datetime
import re

def create_item(data,file):
    if file is not None:
        blob_service_client = BlobServiceClient.from_connection_string(current_app.config["AZURE_STORAGE_CONNECTION_STRING"])
        filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
        blob_client = blob_service_client.get_container_client(current_app.config['CONTAINER_NAME']).get_blob_client(filename)
        blob_client.upload_blob(file.stream.read(), overwrite=True)
        sas_token = generate_blob_sas(
                blob_service_client.account_name,
                current_app.config['CONTAINER_NAME'],
                blob_client.blob_name,
                account_key=blob_service_client.credential.account_key,
                permission=BlobSasPermissions(read=True),
                expiry=datetime.max
            )
        if 'image' in data:
            del data['image']
        data['image'] = f"https://{blob_service_client.account_name}.blob.core.windows.net/{current_app.config['CONTAINER_NAME']}/{filename}?{sas_token}" 
    add_item=collection_2.insert_one(data)
    return add_item

def get_all_items():
    items_data=collection_2.find()
    return list(items_data)

def get_item_data(id):
    item_data=collection_2.find_one({"_id":ObjectId(id)})
    if item_data is None:
        raise Exception("No item Linked with specified Id.")
    return item_data

def delete_item_data(id):
    item=collection_2.find_one({"_id":ObjectId(id)})
    if item is None:
        raise Exception("No such item Present")
    delete_item=collection_2.find_one_and_delete({"_id":ObjectId(id)})
    return True

def update_item_data(data,file,id):
    item=collection_2.find_one({"_id":ObjectId(id)})
    if item is None:
        raise Exception("No such item Present")
    if file is not None:
        blob_service_client = BlobServiceClient.from_connection_string(current_app.config["AZURE_STORAGE_CONNECTION_STRING"])
        filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
        blob_client = blob_service_client.get_container_client(current_app.config['CONTAINER_NAME']).get_blob_client(filename)
        blob_client.upload_blob(file.stream.read(), overwrite=True)
        sas_token = generate_blob_sas(
                blob_service_client.account_name,
                current_app.config['CONTAINER_NAME'],
                blob_client.blob_name,
                account_key=blob_service_client.credential.account_key,
                permission=BlobSasPermissions(read=True),
                expiry=datetime.max
            )
        data['image_url'] = f"https://{blob_service_client.account_name}.blob.core.windows.net/{current_app.config['CONTAINER_NAME']}/{filename}?{sas_token}" 
        if 'image' in data:
            del data['image']
    updated_item=collection_2.find_one_and_update(
        {"_id": ObjectId(id)},        
        {"$set": data},
        return_document=pymongo.ReturnDocument.AFTER 
        )
    return updated_item            

def get_filters_data(requested_filters):
    params={}
    if "old_price" in requested_filters:
        params['old_price']=requested_filters.get('old_price')
    if "new_price" in requested_filters:
         params['new_price']=requested_filters.get('new_price')
    if "category" in requested_filters:
        params['category']=requested_filters.get('category')
    if "name" in requested_filters:
        name_filter = requested_filters.get('name')
        regex_pattern = re.compile(re.escape(name_filter), re.IGNORECASE)
        params['name'] = {'$regex': regex_pattern}
    skip_items=requested_filters.get('skip',0)
    total_count = collection_2.count_documents(params)
    items_based_on_filters=collection_2.find(params).skip(int(skip_items)).limit(12)
    filtered_items_list = list(items_based_on_filters)
    return {"total_count":total_count,"items":filtered_items_list}