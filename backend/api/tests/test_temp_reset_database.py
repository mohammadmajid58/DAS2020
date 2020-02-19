from rest_framework import status

from api.models import Grade, Student, AcademicPlan
from rest_framework.test import APITestCase

from api.tests.test_setup_function import setup, login


class TempResetDatabaseTestCase(APITestCase):

    def test_temp_reset_database_resets_the_database(self):
        login(self.client)
        setup(self)

        response = self.client.post('/api/reset_database/')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(0, AcademicPlan.objects.all().count())
        self.assertEqual(0, Student.objects.all().count())
        self.assertEqual(0, Grade.objects.all().count())
