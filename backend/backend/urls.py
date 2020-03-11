from django.conf.urls import url
from django.urls import include, path, re_path
from django.contrib import admin
from rest_auth.views import PasswordResetConfirmView

from api.views.index import index

admin.site.site_header = "DAS 2020"
admin.site.site_title = "DAS 2020 Admin Portal"
admin.site.index_title = "DAS 2020 Administration"

urlpatterns = [
    re_path(
        r'^password/reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,'
        r'20})$',
        PasswordResetConfirmView.as_view(),
        name='password_reset_confirm'),
    path('auth/', include('rest_auth.urls')),
    path('api/', include('api.urls')),
    path('admin/', admin.site.urls),
    path("", index, name="index"),
    url(r'^(?:.*)/?$', index),
]
