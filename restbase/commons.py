class CustomModelAdminMixin(object):

    def __init__(self, model, admin_site):
        self.list_display = [field.name for field in model._meta.fields if field.name != "id"]
        self.ordering = ('-id',)
        super(CustomModelAdminMixin, self).__init__(model, admin_site)
 