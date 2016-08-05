from mongoengine.document import EmbeddedDocument, Document
from mongoengine.fields import StringField, ReferenceField, ListField, \
    EmbeddedDocumentField
from rest_framework_mongoengine import viewsets
from rest_framework_mongoengine.serializers import DocumentSerializer, \
    EmbeddedDocumentSerializer
from bitarray._bitarray import __str__


class User(Document):
    email = StringField(required=False)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    
class Product(Document):
    content = StringField()
    name = StringField(max_length=120)
    author = ReferenceField(User, required=False)


class Comment(EmbeddedDocument):
    content = StringField()
    name = StringField(max_length=120)
    
    def __str__(self):
        return self.name
    
class Post(Document):
    title = StringField(max_length=120, required=True)
    author = ReferenceField(User, required=False)
    tags = ListField(StringField(max_length=30))
    comments = ListField(EmbeddedDocumentField(Comment))

    meta = {'allow_inheritance': True}

class TextPost(Post):
    content = StringField()
    
    
class CommentSerializer(EmbeddedDocumentSerializer):
  
    class Meta:
        model = Comment  
        
  
    

class PostSerializer(DocumentSerializer):
    comments = CommentSerializer(Comment, many=True)
    
    class Meta:
        model = Post   
        


    
class UserSerializer(DocumentSerializer):
    class Meta:
        model = User   
        
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects
    serializer_class = UserSerializer    
    
    
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects
    serializer_class = PostSerializer
    
class ProductSerializer(DocumentSerializer):
    #author = UserSerializer(allow_null =True)
    
    class Meta:
        model = Product   
        
class ProdViewSet(viewsets.ModelViewSet):
    queryset = Product.objects
    serializer_class = ProductSerializer  
    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Post.objects(comments__exists=True)
    serializer_class = CommentSerializer
    

    
