from api.models import Student
from rest_framework import status
from rest_framework.test import APITestCase
from .test_setup_function import setup, login
from ..grade_converter import convert_mc


class OverrideAwardTestCase(APITestCase):

    def setUp(self):
        login(self.client)
        setup(self)

    def test_update_award_stored_correctly(self):
        self.client.post("/api/calculate/")

        students = Student.objects.get(matricNo="2894029")
        original_award = convert_mc(students.finalAward1)
        self.assertEquals(original_award, "0U")

        updated_data = {"matricNo": "2894029", "updatedAward": "Fail"}
        self.client.post("/api/override_award/", updated_data)
        students = Student.objects.get(matricNo="2894029")
        new_award = students.updatedAward

        self.assertNotEquals(original_award, new_award)
        self.assertEquals(new_award, "Fail")

    def test_cannot_override_final_award_when_logged_out(self):
        self.client.logout()
        response = self.client.post('/api/override_award/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
