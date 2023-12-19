import json
from bson import ObjectId
from flask import Response


def create_custom_response(data, status_code):
    response = Response(json.dumps(data,cls=JSONOIDEncoder), mimetype="application/json")
    response.status_code = status_code
    return response

class JSONOIDEncoder(json.JSONEncoder):
    def default(self,o):
        if isinstance(o,ObjectId):
            return str(o)
        return json.JSONEncoder.default(self,o)
