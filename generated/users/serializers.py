
from rest_framework import serializers
from .models import *

import sys

from django.db import transaction

     
     
     
    
class AppUserLookupSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()

    class Meta:
        model = AppUser
        fields = ('displayName', 'id',)

class AppRoleLookupSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()

    class Meta:
        model = AppRole
        fields = ('displayName', 'id',)

class GroupLookupSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()

    class Meta:
        model = Group
        fields = ('displayName', 'id',)
    
    
    
    

class AppUserSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
  
    
    class Meta:
        model = AppUser


    
    

class AppRoleSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
  
    
    class Meta:
        model = AppRole


    
    

class GroupSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
  
    
    class Meta:
        model = Group


    
    
    
    
class AppUserWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    
    
    
    
    
    
    

    class Meta:
        model = AppUser
        
    


    
    
    
class AppRoleWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    
    
    
    
    
    
    

    class Meta:
        model = AppRole
        
    


    
    
    
class GroupWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    
    
    
    
    
    
    

    class Meta:
        model = Group
        
    


    
class FullAppUserSerializer(AppUserSerializer):

 
    
    class Meta(AppUserSerializer.Meta):
        model = AppUser

class FullAppRoleSerializer(AppRoleSerializer):

 
    
    class Meta(AppRoleSerializer.Meta):
        model = AppRole

class FullGroupSerializer(GroupSerializer):

 
    
    class Meta(GroupSerializer.Meta):
        model = Group

    
  