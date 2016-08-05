
from rest_framework import routers
from rest_framework_mongoengine.routers import SimpleRouter as sr

from mystore.dm import PostViewSet, UserViewSet, ProdViewSet as pv, CommentViewSet

from .views import *


router = routers.SimpleRouter(trailing_slash=False)

mymongorouter =  sr(trailing_slash=False)

mymongorouter.register(r'posts', PostViewSet)
mymongorouter.register(r'users', UserViewSet)
mymongorouter.register(r'products', pv)
mymongorouter.register(r'comments', CommentViewSet)




router.register(r'products', ProductViewSet)
router.register(r'productsWritable', ProductWritableViewSet)
router.register(r'productsComplete', ProductCompleteViewSet)
router.register(r'productsLookup', ProductLookupViewSet)
  
router.register(r'categorys', CategoryViewSet)
router.register(r'categorysWritable', CategoryWritableViewSet)
router.register(r'categorysComplete', CategoryCompleteViewSet)
router.register(r'categorysLookup', CategoryLookupViewSet)
  
router.register(r'customers', CustomerViewSet)
router.register(r'customersWritable', CustomerWritableViewSet)
router.register(r'customersComplete', CustomerCompleteViewSet)
router.register(r'customersLookup', CustomerLookupViewSet)
  
router.register(r'customerOrders', CustomerOrderViewSet)
router.register(r'customerOrdersWritable', CustomerOrderWritableViewSet)
router.register(r'customerOrdersComplete', CustomerOrderCompleteViewSet)
router.register(r'customerOrdersLookup', CustomerOrderLookupViewSet)
  
router.register(r'orderItems', OrderItemViewSet)
router.register(r'orderItemsWritable', OrderItemWritableViewSet)
router.register(r'orderItemsComplete', OrderItemCompleteViewSet)
router.register(r'orderItemsLookup', OrderItemLookupViewSet)
  
router.register(r'employees', EmployeeViewSet)
router.register(r'employeesWritable', EmployeeWritableViewSet)
router.register(r'employeesComplete', EmployeeCompleteViewSet)
router.register(r'employeesLookup', EmployeeLookupViewSet)
  
router.register(r'customerReviews', CustomerReviewViewSet)
router.register(r'customerReviewsWritable', CustomerReviewWritableViewSet)
router.register(r'customerReviewsComplete', CustomerReviewCompleteViewSet)
router.register(r'customerReviewsLookup', CustomerReviewLookupViewSet)

    
