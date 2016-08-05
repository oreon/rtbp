
 
 # factories.py
import factory
from . import models



class  AppUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models. AppUser
        
        
    userName = factory.Sequence(lambda n: CharField) 
    
    password = factory.Sequence(lambda n: CharField) 
    
    enabled = factory.Sequence(lambda n: NullBooleanField) 
    
    groups =    models.ManyToManyField("users.Group",  blank=True,  related_name="groups")
            
        
    
 

    #first_name = factory.Sequence(lambda n: "Agent %03d" % n)
    #group = factory.SubFactory(GroupFactory)



class  AppRoleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models. AppRole
        
        
    name = factory.Sequence(lambda n: CharField) 
    
    groups =    models.ManyToManyField("users.Group",  blank=True,  related_name="groups")
            
        
    
 

    #first_name = factory.Sequence(lambda n: "Agent %03d" % n)
    #group = factory.SubFactory(GroupFactory)



class  GroupFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models. Group
        
        
    appUsers =    models.ManyToManyField("users.AppUser",  blank=True,  related_name="appUsers")
            
        
    
    appRoles =    models.ManyToManyField("users.AppRole",  blank=True,  related_name="appRoles")
            
        
    
 

    #first_name = factory.Sequence(lambda n: "Agent %03d" % n)
    #group = factory.SubFactory(GroupFactory)



 