from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers

from mystore.views import * 

from mystore.urls import router




urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'restbase.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
      url(r'^$', 'mystore.views.index'),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api-token-auth/', 'rest_framework_jwt.views.obtain_jwt_token'),
    url(r'^admin/', include(admin.site.urls)),
)
