
from rest_framework import serializers
from .models import *

import sys

from django.db import transaction

	 
	 
	 
	 
	 
	 

	 


	 
from  users.serializers import  AppUserLookupSerializer
	 

	 
    
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

class ProductLookupSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = ('displayName', 'id',)

class CategoryLookupSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()

    class Meta:
        model = Category
        fields = ('displayName', 'id',)

class CustomerLookupSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()

    class Meta:
        model = Customer
        fields = ('displayName', 'id',)

class CustomerOrderLookupSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()

    class Meta:
        model = CustomerOrder
        fields = ('displayName', 'id',)

class OrderItemLookupSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = ('displayName', 'id',)

class EmployeeLookupSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()

    class Meta:
        model = Employee
        fields = ('displayName', 'id',)

class CustomerReviewLookupSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()

    class Meta:
        model = CustomerReview
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


	
	

class ProductSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
  
    
    class Meta:
        model = Product


	
	

class CategorySerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
  
    
    class Meta:
        model = Category


	
		
	
		
	
	

class OrderItemSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
    customerOrder = CustomerOrderLookupSerializer()
    product = ProductLookupSerializer()
  
    
    class Meta:
        model = OrderItem


	
	

class CustomerOrderSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
    customer = CustomerLookupSerializer()
  
    orderItems = OrderItemSerializer(many=True, read_only = True)
    
    class Meta:
        model = CustomerOrder


	
		
	
	

class CustomerReviewSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
    customer = CustomerLookupSerializer()
  
    
    class Meta:
        model = CustomerReview


	
	

class CustomerSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
  
    customerOrders = CustomerOrderSerializer(many=True, read_only = True)
    customerReviews = CustomerReviewSerializer(many=True, read_only = True)
    
    class Meta:
        model = Customer


	
	

class EmployeeSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
    appUser = AppUserLookupSerializer()
  
    
    class Meta:
        model = Employee


	
	
	
    
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
        
    


	
	
    
class ProductWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    
    
    

    class Meta:
        model = Product
        
    


	
	
    
class CategoryWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    
    
    

    class Meta:
        model = Category
        
    


	
		
	
		
	
	
    
class OrderItemWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    
    
    

    class Meta:
        model = OrderItem
        exclude = ('customerOrder',)
    


	
	
    
class CustomerOrderWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    
    orderItems = OrderItemWritableSerializer(many=True)
    
    
    
    
    @transaction.atomic
    def create(self, validated_data):
        try:
        	
            orderItemsCurrent = validated_data.pop('orderItems')   
            
            
            customerOrder = CustomerOrder.objects.create(**validated_data)
            
            
            for item in orderItemsCurrent:
                OrderItem(customerOrder=customerOrder, **item).save()    
            
            return customerOrder
        except :
            e = sys.exc_info()[0]

    @transaction.atomic
    def update(self, instance, validated_data):
        try:
            
            self.updateOrderItems(instance, validated_data)    
            
            return super(CustomerOrderWritableSerializer, self).update( instance, validated_data)
        except :
            e = sys.exc_info()[0]
    
    
    def updateOrderItems(self, instance , validated_data):
    	if not 'orderItems' in validated_data.keys() : return;
    
        orderItemsCurrent = validated_data.pop('orderItems')
            
        ids = [item['id'] for item in orderItemsCurrent  if 'id' in item.keys() ]
        
        for item in instance.orderItems.all() :
            if item.id not in ids: 
                item.delete()
        
        for item in orderItemsCurrent:
            OrderItem(customerOrder=instance, **item).save()  
     
     

    class Meta:
        model = CustomerOrder
        exclude = ('customer',)
    


	
		
	
	
    
class CustomerReviewWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    
    
    

    class Meta:
        model = CustomerReview
        exclude = ('customer',)
    


	
	
    
class CustomerWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    
    customerOrders = CustomerOrderWritableSerializer(many=True)
    
    customerReviews = CustomerReviewWritableSerializer(many=True)
    
    
    
    
    @transaction.atomic
    def create(self, validated_data):
        try:
        	
            customerOrdersCurrent = validated_data.pop('customerOrders')   
            
            customerReviewsCurrent = validated_data.pop('customerReviews')   
            
            
            customer = Customer.objects.create(**validated_data)
            
            
            for item in customerOrdersCurrent:
                CustomerOrder(customer=customer, **item).save()    
            
            for item in customerReviewsCurrent:
                CustomerReview(customer=customer, **item).save()    
            
            return customer
        except :
            e = sys.exc_info()[0]

    @transaction.atomic
    def update(self, instance, validated_data):
        try:
            
            self.updateCustomerOrders(instance, validated_data)    
            
            self.updateCustomerReviews(instance, validated_data)    
            
            return super(CustomerWritableSerializer, self).update( instance, validated_data)
        except :
            e = sys.exc_info()[0]
    
    
    def updateCustomerOrders(self, instance , validated_data):
    	if not 'customerOrders' in validated_data.keys() : return;
    
        customerOrdersCurrent = validated_data.pop('customerOrders')
            
        ids = [item['id'] for item in customerOrdersCurrent  if 'id' in item.keys() ]
        
        for item in instance.customerOrders.all() :
            if item.id not in ids: 
                item.delete()
        
        for item in customerOrdersCurrent:
            CustomerOrder(customer=instance, **item).save()  
     
    def updateCustomerReviews(self, instance , validated_data):
    	if not 'customerReviews' in validated_data.keys() : return;
    
        customerReviewsCurrent = validated_data.pop('customerReviews')
            
        ids = [item['id'] for item in customerReviewsCurrent  if 'id' in item.keys() ]
        
        for item in instance.customerReviews.all() :
            if item.id not in ids: 
                item.delete()
        
        for item in customerReviewsCurrent:
            CustomerReview(customer=instance, **item).save()  
     
     

    class Meta:
        model = Customer
        
    


	
	
    
class EmployeeWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    
    
    

    class Meta:
        model = Employee
        
    


    
class FullAppUserSerializer(AppUserSerializer):

 
    
    class Meta(AppUserSerializer.Meta):
        model = AppUser

class FullAppRoleSerializer(AppRoleSerializer):

 
    
    class Meta(AppRoleSerializer.Meta):
        model = AppRole

class FullGroupSerializer(GroupSerializer):

 
    
    class Meta(GroupSerializer.Meta):
        model = Group

class FullProductSerializer(ProductSerializer):

 
    
    class Meta(ProductSerializer.Meta):
        model = Product

class FullCategorySerializer(CategorySerializer):

 
    
    class Meta(CategorySerializer.Meta):
        model = Category

class FullCustomerSerializer(CustomerSerializer):

 
    
    class Meta(CustomerSerializer.Meta):
        model = Customer

class FullCustomerOrderSerializer(CustomerOrderSerializer):

 
    
    class Meta(CustomerOrderSerializer.Meta):
        model = CustomerOrder

class FullOrderItemSerializer(OrderItemSerializer):

 
    
    class Meta(OrderItemSerializer.Meta):
        model = OrderItem

class FullEmployeeSerializer(EmployeeSerializer):

 
    
    class Meta(EmployeeSerializer.Meta):
        model = Employee

class FullCustomerReviewSerializer(CustomerReviewSerializer):

 
    
    class Meta(CustomerReviewSerializer.Meta):
        model = CustomerReview

    
  