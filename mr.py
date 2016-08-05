# import os
# 
# from flask import Flask, request
# from flask.ext.mongoengine import MongoEngine
# from flask.ext.mongorest import MongoRest
# from flask.ext.mongorest.views import ResourceView
# from flask.ext.mongorest.resources import Resource
# from flask.ext.mongorest import operators as ops
# from flask.ext.mongorest.methods import *
# from flask.ext.mongorest.authentication import AuthenticationBase
# 
# 
# app = Flask(__name__)
# 
# # Create dummy secrey key so we can use sessions
# app.config['SECRET_KEY'] = '123456790'
# app.config['MONGODB_SETTINGS'] = {'DB': 'testing11'}
# 
# # Create models
# db = MongoEngine()
# db.init_app(app)
# 
# db = MongoEngine(app)
# api = MongoRest(app)
# 
# class User(db.Document):
#     email = db.EmailField(unique=True, required=True)
# 
# class Content(db.EmbeddedDocument):
#     text = db.StringField()
# 
# class ContentResource(Resource):
#     document = Content
# 
# class Post(db.Document):
#     title = db.StringField(max_length=120, required=True)
#     author = db.ReferenceField(User)
#     content = db.EmbeddedDocumentField(Content)
# 
# class PostResource(Resource):
#     document = Post
#     related_resources = {
#         'content': ContentResource,
#     }
#     filters = {
#         'title': [ops.Exact, ops.Startswith],
#         'author_id': [ops.Exact],
#     }
#     rename_fields = {
#         'author': 'author_id',
#     }
# 
# @api.register(name='posts', url='/posts/')
# class PostView(ResourceView):
#     resource = PostResource
#     methods = [methods.Create, methods.Update, methods.Fetch, methods.List]