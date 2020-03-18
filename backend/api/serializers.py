from django.contrib.auth.forms import PasswordResetForm
from rest_framework import serializers

from api.models import Grade, Student
from backend import settings


class ListGradeSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        grades = [Grade(**item) for item in validated_data]
        return Grade.objects.bulk_create(grades)


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        list_serializer_class = ListGradeSerializer
        fields = ['courseCode', 'matricNo', 'alphanum']


class ListStudentSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        students = [Student(**item) for item in validated_data]
        return Student.objects.bulk_create(students)


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        list_serializer_class = ListStudentSerializer

        fields = ['matricNo', 'givenNames', 'surname', 'academicPlan', 'gradYear',
                  'finalAward1', 'finalAward2', 'finalAward3', 'updatedAward',
                  'hasSpecialCode', 'isMissingGrades']


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password_reset_form_class = PasswordResetForm

    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            from pylint.checkers.typecheck import _
            raise serializers.ValidationError(_('Error'))  # noqa: F821
        return value

    def save(self):
        request = self.context.get('request')
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'request': request,
        }
        self.reset_form.save(**opts)
