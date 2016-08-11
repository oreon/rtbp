
import sys

from django.db import transaction
from django.forms.models import ModelForm
from rest_framework import serializers, status
from rest_framework.response import Response

from  users.serializers import  AppUserLookupSerializer

from .models import *



     


     
     

     
    
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


    
    
    
    
class ProductWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    #image = serializers.ReadOnlyField()
    

    class Meta:
        model = Product
        
    


    
    
    
class CategoryWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    
    class Meta:
        model = Category
        
    


    
        
class OrderItemWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    customerOrder_displayName = serializers.ReadOnlyField(source='customerOrderDisplayName')
    product_displayName = serializers.ReadOnlyField(source='productDisplayName')
    
    
    product = serializers.PrimaryKeyRelatedField(queryset = Product.objects.all())
    
    
    class Meta:
        model = OrderItem
        exclude = ('customerOrder',)
    

    
    
class CustomerOrderWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    customer_displayName = serializers.ReadOnlyField(source='customerDisplayName')
    
    orderItems = OrderItemWritableSerializer(many=True)
    
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    
    
    @transaction.atomic
    def create(self, validated_data):
        try:
            
            orderItemsCurrent = validated_data.pop('orderItems')   
                        
            customerOrder = CustomerOrder.objects.create(**validated_data)
                       
            for item in orderItemsCurrent:
                item['customerOrder'] = customerOrder
                s = OrderItemWritableSerializer(data=item) 
                if(s.is_valid()):
                    s.create(item)   
            
            return customerOrder
        except :
            e = sys.exc_info()[0]
            print (e)
            raise

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
    
    customer_displayName = serializers.ReadOnlyField(source='customerDisplayName')
    
    
    
    
    

    class Meta:
        model = CustomerReview
        exclude = ('customer',)
    


   
   
class CustomerForm(ModelForm):
    class Meta:
        model = Customer
        fields = '__all__'
          
    
    
class CustomerWritableSerializer(serializers.ModelSerializer):
    
    displayName = serializers.ReadOnlyField()
    
    customerOrders = CustomerOrderWritableSerializer(many=True)
    
    customerReviews = CustomerReviewWritableSerializer(many=True)
    
    def create(self, validated_data):
        form = CustomerForm(data=self.context['request'].data)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.save()
            return instance
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    @transaction.atomic
    def createme(self, validated_data):
        
            customerOrdersCurrent = validated_data.pop('customerOrders')   
            customerReviewsCurrent = validated_data.pop('customerReviews')   
            
            customer = Customer.objects.create(**validated_data)
            
            for item in customerOrdersCurrent:
                item['customer'] = customer
                CustomerOrder.objects.create_Or_update_custom(item)
            
            for item in customerReviewsCurrent:
                CustomerReview(customer=customer, **item).save()    
            
            return customer
        

    @transaction.atomic
    def update(self, instance, validated_data):
            
            customerOrdersCurrent = validated_data.pop('customerOrders')   
            customerReviewsCurrent = validated_data.pop('customerReviews')  
            
            instance.customerOrders.all().delete() 
            
            for item in customerOrdersCurrent:
                item['customer'] = instance
                CustomerOrder.objects.create_Or_update_custom(item)    
            
            self.updateCustomerReviews(instance, validated_data)    
            
            return super(CustomerWritableSerializer, self).update( instance, validated_data)
    
    
    def updateCustomerOrders(self, instance , validated_data):
        if not 'customerOrders' in validated_data.keys() : return;
    
        customerOrdersCurrent = validated_data.pop('customerOrders')
        
        for item in customerOrdersCurrent:
            #print(item['notes'])
            if(not 'id' in item.keys() ):
                #CustomerOrder.objects.create(item)
                item['customer'] = instance
                s = CustomerOrderWritableSerializer(data=item) 
                
                if(s.is_valid()):
                    s.create(item)
                else:
                    raise Exception(s.errors)
                                    #co.orderItems = item['orderItems']
                #co.notes = item['notes']
               
                #print(co.orderItems)
                #co.save()
                #CustomerOrder.objects.create(**item)
            else:
                CustomerOrder.objects.update( **item)
        
            
     
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
    
    appUser_displayName = serializers.ReadOnlyField(source='appUserDisplayName')
    
    
    
    
    

    class Meta:
        model = Employee
        
    


    
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

    
  