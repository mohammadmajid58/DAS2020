from api.models import Student
from rest_framework import status
from rest_framework.test import APITestCase
from .test_setup_function import setup, login


class FinalAwardTestCase(APITestCase):

    def setUp(self):
        login(self.client)
        setup(self)

    def test_final_award_is_calculated_correctly(self):
        response = self.client.post('/api/calculate/')

        student = Student.objects.get(matricNo="2894029")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(student.finalAward, 16)

    # TODO: FIX THESE TESTS FOR NEW SETUP
    def test_cannot_calculate_final_award_when_logged_out(self):
        self.client.logout()
        response = self.client.post('/api/calculate/')
        student = Student.objects.get(matricNo="2894029")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(student.finalAward, 0)
