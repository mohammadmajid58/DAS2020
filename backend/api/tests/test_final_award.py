from api.models import Student
from rest_framework import status
from rest_framework.test import APITestCase
from .test_setup_function import setup


class FinalAwardTestCase(APITestCase):

    def setUp(self):
        setup(self)

    def test_final_award_is_calculated_correctly(self):

        response = self.client.post('/api/calculate/')

        student = Student.objects.get(matricNo="2894029")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(student.finalAward, 16)
