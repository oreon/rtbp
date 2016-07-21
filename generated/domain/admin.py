
 
from django.contrib import admin

from domain.models import *
from restbase.commons import CustomModelAdminMixin

 
 
class AppUserAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

class AppRoleAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

class GroupAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

class ProductAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

class CategoryAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

class CustomerAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

class CustomerOrderAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

class OrderItemAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

class EmployeeAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

class CustomerReviewAdmin(CustomModelAdminMixin, admin.ModelAdmin):
    pass

 
 