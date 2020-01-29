from django.conf.urls import url
from django.urls import include, path
from django.contrib import admin

from api.views.index import index

urlpatterns = [
    path('auth/', include('rest_auth.urls')),
    path('api/', include('api.urls')),
    path('admin/', admin.site.urls),
    path("", index, name="index"),
    url(r'^(?:.*)/?$', index),
]
