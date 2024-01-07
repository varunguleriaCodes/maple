from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

MONGO_URL="MongoDb Cloud Url"
client=MongoClient(MONGO_URL,server_api=ServerApi('1'))

database_name="mappleDB"
db=client[database_name]
collection_name_1="users"
collection_name_2="items"
collection_name_3="cart"
collection_name_4="orders"
collection_1=db[collection_name_1]
collection_2=db[collection_name_2]
collection_3=db[collection_name_3]
collection_4=db[collection_name_4]