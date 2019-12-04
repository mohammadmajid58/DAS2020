from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import Grade, Student


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email']


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['courseCode', 'matricNo', 'alphanum']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['matricNo', 'givenNames', 'surname', 'academicPlan', 'finalAward']
