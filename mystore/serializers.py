
from rest_framework import serializers
from .models import *

import sys

from django.db import transaction
    
    
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

class CustomerReviewSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
    customer = CustomerLookupSerializer()
  
    
    class Meta:
        model = CustomerReview


class CustomerOrderSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
    customer = CustomerLookupSerializer()
  
    orderItems = OrderItemSerializer(many=True, read_only = True)
    
    class Meta:
        model = CustomerOrder


class CustomerSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
  
    customerOrder = CustomerOrderSerializer(many=True, read_only = True)
    customerReview = CustomerReviewSerializer(many=True, read_only = True)
    
    class Meta:
        model = Customer







class EmployeeSerializer(serializers.ModelSerializer):
    displayName = serializers.ReadOnlyField()
    
  
    
    class Meta:
        model = Employee




    
    
class ProductWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    

    class Meta:
        model = Product
    

    
class CategoryWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    

    class Meta:
        model = Category
    

    
class CustomerWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    OrderItemSerializer 
    
    @transaction.atomic
    def create(self, validated_data):
        try:
            
            customer = Customer.objects.create(**validated_data)
            
            
            self.updateCustomerOrder(customer, validated_data)    
            
            self.updateCustomerReview(customer, validated_data)    
            
            return customer
        except :
            e = sys.exc_info()[0]

    @transaction.atomic
    def update(self, instance, validated_data):
        try:
            
            self.updateCustomerOrder(instance, validated_data)    
            
            self.updateCustomerReview(instance, validated_data)    
            
            return super(CustomerWritableSerializer, self).update( instance, validated_data)
        except :
            e = sys.exc_info()[0]
    
    
    def updateCustomerOrder(self, instance , validated_data):
        if not 'customerOrder' in validated_data.keys() : return;
    
        customerOrderCurrent = validated_data.pop('customerOrder')
            
        ids = [item['id'] for item in customerOrderCurrent  if 'id' in item.keys() ]
        
        for item in instance.customerOrder.all() :
            if item.id not in ids: 
                item.delete()
        
        for item in customerOrderCurrent:
            newItem = CustomerOrder(**item); newItem.save()  
     
    def updateCustomerReview(self, instance , validated_data):
        if not 'customerReview' in validated_data.keys() : return;
    
        customerReviewCurrent = validated_data.pop('customerReview')
            
        ids = [item['id'] for item in customerReviewCurrent  if 'id' in item.keys() ]
        
        for item in instance.customerReview.all() :
            if item.id not in ids: 
                item.delete()
        
        for item in customerReviewCurrent:
            newItem = CustomerReview(**item); newItem.save()  
     
     
 
     

    class Meta:
        model = Customer
    

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
            print (e)

    @transaction.atomic
    def update(self, instance, validated_data):
        try:
            
            self.updateOrderItems(instance, validated_data)    
            
            return super(CustomerOrderWritableSerializer, self).update( instance, validated_data)
        except :
            e = sys.exc_info()[0]
            print(e)
    
    
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
    

    

    

    
class EmployeeWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    

    class Meta:
        model = Employee
    

    
class CustomerReviewWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    

    class Meta:
        model = CustomerReview
    

    
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

    
  