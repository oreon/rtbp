
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

    
