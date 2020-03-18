from rest_framework import routers
from django.urls import path

from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('grades/', views.GradeViewSet.as_view(), name='grades'),
    path('students/', views.StudentViewSet.as_view(), name='students'),
    path('calculate/', views.calculate, name='calculate'),
    path('reset_database/', views.temp_reset_database, name='reset_database'),
    path('override_award/', views.override_award, name='override_award')
] + router.urls
