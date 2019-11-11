from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import Grade


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email']


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['courseCode', 'student', 'alphanum']
