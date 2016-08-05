from bson.json_util import dumps
from flask import Flask, jsonify
from flask_mongoengine import MongoEngine
from flask_mongorest import MongoRest
from flask_mongorest import methods  
from flask_mongorest import operators as ops
from flask_mongorest.resources import Resource
from flask_mongorest.views import ResourceView
#from flask_restful import reqparse, abort, Api, Resource
from flask_restful import Api
from mystore.dm import * 


#from flask_restful import Resource, Api
app = Flask(__name__)
api = MongoRest(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

#api.add_resource(HelloWorld, '/hellow')


TODOS = {
    'todo1': {'task': 'build an API'},
    'todo2': {'task': '?????'},
    'todo3': {'task': 'profit!'},
}

    
@app.route('/')
def show_entries():
    return Post.objects.to_json()


@app.route('/<id>')
def show_entries_byId():
    #print(id)
    return Post.objects.to_json()


class CommentResource(Resource):
    document = Comment


class PostResource(Resource):
    document = Post
    

@api.register(name='posts', url='/posts/')
class PostView(ResourceView):
    resource = PostResource
    methods = [methods.Create, methods.Update, methods.Fetch, methods.List]


##
## Actually setup the Api resource routing here
##
# api.add_resource(TodoList, '/todos')
# api.add_resource(Todo, '/todos/<todo_id>')

if __name__ == '__main__':
    app.run(debug=True)
    