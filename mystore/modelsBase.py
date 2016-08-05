
from django.db import models

    
CustomerType = (
    ('0', 'BRONZE'),
    ('1', 'SILVER'),
    ('2', 'GOLD'),
  
)
    
      

class PersonBase(models.Model): 

    firstName = models.CharField(null = False, blank =  False, max_length=30)
    
    lastName = models.CharField(null = False, blank =  False, max_length=30)
    
 
    @property   
    def displayName(self):
        return self.__str__()
    
    def __str__(self):
        return ''.join([self.firstName , ', ', self.lastName]) 
        
    class Meta:
        abstract = True
        
    
      
        

    
 

class ProductBase(models.Model): 

    name = models.CharField(null = False, blank =  False, max_length=30)
    
    price = models.DecimalField(null = False, blank =  True, decimal_places=2, max_digits=9 )
    
    image = models.ImageField(null = False, blank =  True, )
    
    categorys =    models.ManyToManyField("mystore.Category",  blank=True,  related_name="categorys")
            
        
    
    displayTill = models.DateField(null = False, blank =  True, )
    
 
    @property   
    def displayName(self):
        return self.__str__()
    
    def __str__(self):
        return self.name 
        
    class Meta:
        abstract = True
        
    
      
        


 

class CategoryBase(models.Model): 

    products =    models.ManyToManyField("mystore.Product",  blank=True,  related_name="products")
            
        
    
    name = models.CharField(null = False, blank =  False, max_length=30)
    
 
    @property   
    def displayName(self):
        return self.__str__()
    
    def __str__(self):
        return self.name 
        
    class Meta:
        abstract = True
        
    
      
        


 

class CustomerBase(PersonBase): 

            
        
    
            
        
    
    customerType = models.CharField(null = False, blank =  True, max_length = 1 , choices = CustomerType)
    
 
    @property   
    def displayName(self):
        return self.__str__()
    
    def __str__(self):
        return super().__str__() 
        
    class Meta:
        abstract = True
        
    
      
        


 

class CustomerOrderBase(models.Model):       
    
    customer = models.ForeignKey('mystore.Customer', related_name='customerOrder')
        
    
    notes = models.TextField(null = False, blank =  True, )
    
 
    @property   
    def displayName(self):
        return self.__str__()
    
    def __str__(self):
        return self.notes 
        
    class Meta:
        abstract = True
        
    
      
        


 

class OrderItemBase(models.Model): 

    customerOrder = models.ForeignKey('mystore.CustomerOrder', related_name='orderItems')
    
    qty = models.PositiveIntegerField(null = False, blank =  True, )
    
    product = models.ForeignKey('mystore.Product', related_name='orderItem')


    @property   
    def productDisplayName(self):
        return self.product.__str__()
 
    @property   
    def displayName(self):
        return self.__str__()
    
    def __str__(self):
        return self.product.name
        
    class Meta:
        abstract = True
        
    
      
        unique_together = ("customerOrder", "product")
      
        


 

class EmployeeBase(PersonBase): 

    active = models.NullBooleanField(null = False, blank =  True, )
    
        
    appUser =    models.OneToOneField("users.AppUser",  blank=True,  related_name="appUser")
        
    
 
    @property   
    def displayName(self):
        return self.__str__()
    
    def __str__(self):
        return super().__str__() 
        
    class Meta:
        abstract = True
        
    
      
        


 

class CustomerReviewBase(models.Model): 

    customer = models.ForeignKey('mystore.Customer', related_name='customerReview')
        
    
    review = models.TextField(null = False, blank =  True, )
    
    rating = models.PositiveIntegerField(null = False, blank =  True, )
    
 
    @property   
    def displayName(self):
        return self.__str__()
    
    def __str__(self):
        return self.review 
        
    class Meta:
        abstract = True
        
    
      
        

  