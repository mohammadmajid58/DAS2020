from django.urls import path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('grades/', views.GradeViewSet.as_view(), name='grades'),
    path('students/', views.StudentViewSet.as_view(), name='students'),
    path('calculate/', views.calculate, name='calculate')
] + router.urls
