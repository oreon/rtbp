
from rest_framework import viewsets
from .serializers import *
    
class AppUserViewSet(viewsets.ModelViewSet):
    queryset = AppUser.objects.all()
    serializer_class = AppUserSerializer
    
class AppUserLookupViewSet(viewsets.ModelViewSet):
    queryset = AppUser.objects.all()
    serializer_class = AppUserLookupSerializer
    
class AppUserCompleteViewSet(AppUserViewSet):
    serializer_class = FullAppUserSerializer
    
class AppUserWritableViewSet(AppUserViewSet):
    serializer_class = AppUserWritableSerializer    

class AppRoleViewSet(viewsets.ModelViewSet):
    queryset = AppRole.objects.all()
    serializer_class = AppRoleSerializer
    
class AppRoleLookupViewSet(viewsets.ModelViewSet):
    queryset = AppRole.objects.all()
    serializer_class = AppRoleLookupSerializer
    
class AppRoleCompleteViewSet(AppRoleViewSet):
    serializer_class = FullAppRoleSerializer
    
class AppRoleWritableViewSet(AppRoleViewSet):
    serializer_class = AppRoleWritableSerializer    

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    
class GroupLookupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupLookupSerializer
    
class GroupCompleteViewSet(GroupViewSet):
    serializer_class = FullGroupSerializer
    
class GroupWritableViewSet(GroupViewSet):
    serializer_class = GroupWritableSerializer    

  