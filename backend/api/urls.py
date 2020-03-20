from rest_framework import routers
from django.urls import path

from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('grades/', views.GradeViewSet.as_view(), name='grades'),
    path('students/', views.StudentViewSet.as_view(), name='students'),
    path('calculate/', views.calculate, name='calculate'),
    path('override_award/', views.override_award, name='override_award'),
    path('student_grades/', views.get_student_grades, name='get_student_grades'),
    path('override_grade/', views.override_grade, name='override_award'),
    path('get_grad_years/', views.get_grad_years, name='get_grad_years')
] + router.urls
