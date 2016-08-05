
from django.db import models
from generated.mystore.modelsBase import *
    
class Product(ProductBase): 
        pass
    

class Category(CategoryBase): 
        pass
    

class Customer(CustomerBase): 
        pass
    
class CustomerOrderManager(models.Manager):
    
    def create_Or_update_custom(self, items):
        
        ois = items['orderItems']         
        del items['orderItems']  
            
        co = CustomerOrder(**items)
        co.save()
        
        for i in ois:
            oi = OrderItem() 
            for k, v in i.items(): 
                setattr(oi, k, v)
            oi.customerOrder = co
            oi.save()
            #co.orderItems.add(oi)
            
        return co

class CustomerOrder(CustomerOrderBase): 
        objects = CustomerOrderManager()
        pass
    

class OrderItem(OrderItemBase): 
        pass
    

class Person(PersonBase): 
    class Meta:
        abstract = True
    

class Employee(EmployeeBase): 
        pass
    

class CustomerReview(CustomerReviewBase): 
        pass
    

  