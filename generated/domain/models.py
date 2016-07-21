
from django.db import models
from .modelsBase import *
    
class AppUser(AppUserBase): 
        pass
    

class AppRole(AppRoleBase): 
        pass
    

class Group(GroupBase): 
        pass
    

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
    

  