
 
 # factories.py
import factory
from . import models



class  ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models. Product
        
        
    name = factory.Sequence(lambda n: CharField) 
    
    price = factory.Sequence(lambda n: DecimalField) 
    
    image = factory.Sequence(lambda n: ImageField) 
    
    categorys =    models.ManyToManyField("mystore.Category",  blank=True,  related_name="categorys")
            
        
    
    displayTill = factory.Sequence(lambda n: DateField) 
    
 

    #first_name = factory.Sequence(lambda n: "Agent %03d" % n)
    #group = factory.SubFactory(GroupFactory)



class  CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models. Category
        
        
    products =    models.ManyToManyField("mystore.Product",  blank=True,  related_name="products")
            
        
    
    name = factory.Sequence(lambda n: CharField) 
    
 

    #first_name = factory.Sequence(lambda n: "Agent %03d" % n)
    #group = factory.SubFactory(GroupFactory)



class  CustomerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models. Customer
        
        
    firstName = factory.Sequence(lambda n: CharField) 
    
    lastName = factory.Sequence(lambda n: CharField) 
    
            
        
    
            
        
    
    customerType = factory.Sequence(lambda n: CharField) 
    
 

    #first_name = factory.Sequence(lambda n: "Agent %03d" % n)
    #group = factory.SubFactory(GroupFactory)



class  CustomerOrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models. CustomerOrder
        
        
            
        
    
    customer = factory.SubFactory(mystore.CustomerFactory)
        
    
    notes = factory.Sequence(lambda n: TextField) 
    
 

    #first_name = factory.Sequence(lambda n: "Agent %03d" % n)
    #group = factory.SubFactory(GroupFactory)



class  OrderItemFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models. OrderItem
        
        
    customerOrder = factory.SubFactory(mystore.CustomerOrderFactory)
        
    
    qty = factory.Sequence(lambda n: PositiveIntegerField) 
    
    product = factory.SubFactory(mystore.ProductFactory)
        
    
 

    #first_name = factory.Sequence(lambda n: "Agent %03d" % n)
    #group = factory.SubFactory(GroupFactory)



class  EmployeeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models. Employee
        
        
    firstName = factory.Sequence(lambda n: CharField) 
    
    lastName = factory.Sequence(lambda n: CharField) 
    
    active = factory.Sequence(lambda n: NullBooleanField) 
    
        
    appUser =    models.OneToOneField("users.AppUser",  blank=True,  related_name="appUser")
        
    
 

    #first_name = factory.Sequence(lambda n: "Agent %03d" % n)
    #group = factory.SubFactory(GroupFactory)



class  CustomerReviewFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models. CustomerReview
        
        
    customer = factory.SubFactory(mystore.CustomerFactory)
        
    
    review = factory.Sequence(lambda n: TextField) 
    
    rating = factory.Sequence(lambda n: PositiveIntegerField) 
    
 

    #first_name = factory.Sequence(lambda n: "Agent %03d" % n)
    #group = factory.SubFactory(GroupFactory)



 