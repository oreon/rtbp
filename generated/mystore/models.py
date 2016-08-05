
from django.db import models
from .modelsBase import *
    
class Product(ProductBase): 
        pass
    

class Category(CategoryBase): 
        pass
    

class Customer(CustomerBase): 
        pass
    

class CustomerOrder(CustomerOrderBase): 
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
    

  