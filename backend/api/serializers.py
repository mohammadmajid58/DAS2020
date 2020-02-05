from rest_framework import serializers

from api.models import Grade, Student


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['courseCode', 'matricNo', 'alphanum']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['matricNo', 'givenNames', 'surname', 'academicPlan', 'finalAward']
