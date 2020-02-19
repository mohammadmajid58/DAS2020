from api.serializers import StudentSerializer
import json
from api.models import Student, AcademicPlan
from rest_framework import status
from rest_framework.test import APITestCase
from .test_setup_function import setup, login


class StudentTestCase(APITestCase):

    def setUp(self):
        login(self.client)
        setup(self)

    def test_post_student_data(self):
        student = [{"matricNo": "1234567", "givenNames": "Philip J", "surname": "Fry", "academicPlan": "F100-2208",
                    "finalAward": 0}]
        response = self.client.post("/api/students/", student, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_student_data_stored(self):
        data = [{"matricNo": "1234567", "givenNames": "Philip J", "surname": "Fry", "academicPlan": "F100-2208",
                 "finalAward": 0},
                {"matricNo": "7654321", "givenNames": "Hermes", "surname": "Conrad", "academicPlan": "F100-2208",
                 "finalAward": 0}]
        serializer = StudentSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
        student1 = Student.objects.filter(matricNo="1234567", givenNames="Philip J", surname="Fry",
                                          academicPlan="F100-2208", finalAward=0).exists()
        student2 = Student.objects.filter(matricNo="7654321", givenNames="Hermes", surname="Conrad",
                                          academicPlan="F100-2208", finalAward=0).exists()
        self.assertTrue(student1)
        self.assertTrue(student2)

    def test_get_student_object(self):
        response = self.client.get('/api/students/')
        response = response.content.decode('utf-8')
        response_dict = json.loads(response)
        self.assertEqual(response_dict, [{"matricNo": "2894029", "givenNames": "Zak", "surname": "Bagans",
                                          "academicPlan": "F100-2208", "finalAward": 0},
                                         {"matricNo": "2283853", "givenNames": "Robert", "surname": "Goulet",
                                          "academicPlan": "F100-2208", "finalAward": 0}])

    def test_duplicate_student_entries_not_created(self):
        student = [{"matricNo": "2894029", "givenNames": "Zak", "surname": "Bagans",
                    "academicPlan": "F100-2208", "finalAward": 0}]
        response = self.client.post("/api/students/", student, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cannot_get_student_when_logged_out(self):
        self.client.logout()
        Student.objects.get_or_create(matricNo="1234567", givenNames="Lionel", surname="Hutz",
                                      academicPlan=AcademicPlan.objects.get(planCode="F100-2208"), finalAward=0)
        response = self.client.get('/api/students/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_post_student_data_when_logged_out(self):
        self.client.logout()
        student = [{"matricNo": "1234567", "givenNames": "Philip J", "surname": "Fry", "academicPlan": "CHEM_1234",
                    "finalAward": 0}]
        response = self.client.post("/api/students/", student, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        student_exists = Student.objects.filter(matricNo="1234567", givenNames="Phillip J", surname="Fry",
                                                academicPlan="CHEM_1234", finalAward=0).exists()
        self.assertFalse(student_exists)
