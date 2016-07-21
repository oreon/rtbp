
 
from django.contrib import admin

from users.models import *
from restbase.commons import CustomModelAdminMixin

 
 
class AppUserAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

class AppRoleAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

class GroupAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

 
 