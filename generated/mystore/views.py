
from rest_framework import viewsets
from .serializers import *
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
class ProductLookupViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductLookupSerializer
    
class ProductCompleteViewSet(ProductViewSet):
    serializer_class = FullProductSerializer
    
class ProductWritableViewSet(ProductViewSet):
    serializer_class = ProductWritableSerializer    

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
class CategoryLookupViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryLookupSerializer
    
class CategoryCompleteViewSet(CategoryViewSet):
    serializer_class = FullCategorySerializer
    
class CategoryWritableViewSet(CategoryViewSet):
    serializer_class = CategoryWritableSerializer    

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    
class CustomerLookupViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerLookupSerializer
    
class CustomerCompleteViewSet(CustomerViewSet):
    serializer_class = FullCustomerSerializer
    
class CustomerWritableViewSet(CustomerViewSet):
    serializer_class = CustomerWritableSerializer    

class CustomerOrderViewSet(viewsets.ModelViewSet):
    queryset = CustomerOrder.objects.all()
    serializer_class = CustomerOrderSerializer
    
class CustomerOrderLookupViewSet(viewsets.ModelViewSet):
    queryset = CustomerOrder.objects.all()
    serializer_class = CustomerOrderLookupSerializer
    
class CustomerOrderCompleteViewSet(CustomerOrderViewSet):
    serializer_class = FullCustomerOrderSerializer
    
class CustomerOrderWritableViewSet(CustomerOrderViewSet):
    serializer_class = CustomerOrderWritableSerializer    

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    
class OrderItemLookupViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemLookupSerializer
    
class OrderItemCompleteViewSet(OrderItemViewSet):
    serializer_class = FullOrderItemSerializer
    
class OrderItemWritableViewSet(OrderItemViewSet):
    serializer_class = OrderItemWritableSerializer    

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    
class EmployeeLookupViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeLookupSerializer
    
class EmployeeCompleteViewSet(EmployeeViewSet):
    serializer_class = FullEmployeeSerializer
    
class EmployeeWritableViewSet(EmployeeViewSet):
    serializer_class = EmployeeWritableSerializer    

class CustomerReviewViewSet(viewsets.ModelViewSet):
    queryset = CustomerReview.objects.all()
    serializer_class = CustomerReviewSerializer
    
class CustomerReviewLookupViewSet(viewsets.ModelViewSet):
    queryset = CustomerReview.objects.all()
    serializer_class = CustomerReviewLookupSerializer
    
class CustomerReviewCompleteViewSet(CustomerReviewViewSet):
    serializer_class = FullCustomerReviewSerializer
    
class CustomerReviewWritableViewSet(CustomerReviewViewSet):
    serializer_class = CustomerReviewWritableSerializer    

  