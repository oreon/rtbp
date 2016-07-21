
from rest_framework import routers
from .views import *


router = routers.SimpleRouter(trailing_slash=False)

  
router.register(r'appUsers', AppUserViewSet)
router.register(r'appUsersWritable', AppUserWritableViewSet)
router.register(r'appUsersComplete', AppUserCompleteViewSet)
router.register(r'appUsersLookup', AppUserLookupViewSet)
  
router.register(r'appRoles', AppRoleViewSet)
router.register(r'appRolesWritable', AppRoleWritableViewSet)
router.register(r'appRolesComplete', AppRoleCompleteViewSet)
router.register(r'appRolesLookup', AppRoleLookupViewSet)
  
router.register(r'groups', GroupViewSet)
router.register(r'groupsWritable', GroupWritableViewSet)
router.register(r'groupsComplete', GroupCompleteViewSet)
router.register(r'groupsLookup', GroupLookupViewSet)
  
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

    
