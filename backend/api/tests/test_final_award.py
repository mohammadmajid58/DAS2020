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

        passed_final_award1 = 15.738
        final_award1, final_award2, final_award3 = (float(getattr(student, finalAward)) for
                                                    finalAward in ('finalAward1', 'finalAward2', 'finalAward3'))
        self.assertEqual(final_award1, round(passed_final_award1, 1))
        self.assertEqual(final_award2, round(passed_final_award1, 2))
        self.assertEqual(final_award3, passed_final_award1)

    # TODO: FIX THESE TESTS FOR NEW SETUP
    def test_cannot_calculate_final_award_when_logged_out(self):
        self.client.logout()
        response = self.client.post('/api/calculate/')
        student = Student.objects.get(matricNo="2894029")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(student.finalAward1, 0.0)
        self.assertEqual(student.finalAward2, 0.00)
        self.assertEqual(student.finalAward3, 0.000)
