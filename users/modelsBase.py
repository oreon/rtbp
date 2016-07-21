
from django.db import models

    
 

class AppUserBase(models.Model): 

    userName = models.CharField(null = False, blank =  True, max_length=30)
    
    password = models.CharField(null = False, blank =  True, max_length=30)
    
    enabled = models.NullBooleanField(null = False, blank =  True, )
    
    groups =    models.ManyToManyField("users.Group",  blank=True,  related_name="my_groups")
            
        
    
 
    @property   
    def displayName(self):
        return self.__str__()
    
    def __str__(self):
        return self.userName 
        
    class Meta:
        abstract = True
        
    
      
        


 

class AppRoleBase(models.Model): 

    name = models.CharField(null = False, blank =  False, max_length=30)
    
    groups =    models.ManyToManyField("users.Group",  blank=True,  related_name="groups")
            
        
    
 
    @property   
    def displayName(self):
        return self.__str__()
    
    def __str__(self):
        return self.name 
        
    class Meta:
        abstract = True
        
    
      
        


 

class GroupBase(models.Model): 

    appUsers =    models.ManyToManyField("users.AppUser",  blank=True,  related_name="appUsers")
            
        
    
    appRoles =    models.ManyToManyField("users.AppRole",  blank=True,  related_name="appRoles")
            
        
    
 
    @property   
    def displayName(self):
        return self.__str__()
    
    def __str__(self):
        return self.appUsers+ "" 
        
    class Meta:
        abstract = True
        
    
      
        

  