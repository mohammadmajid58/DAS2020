from django.urls import path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('grades/', views.GradeViewSet.as_view(), name='grades'),
    path('students/', views.StudentViewSet.as_view(), name='students')
] + router.urls
