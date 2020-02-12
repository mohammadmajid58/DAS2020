from api.serializers import GradeSerializer
import json
from api.models import Grade, Student
from .test_setup_function import setup
from rest_framework import status
from rest_framework.test import APITestCase


class GradeTestCase(APITestCase):

    def setUp(self):
        setup(self)

    def test_post_grade_data_sets_student_grade_data_updated(self):
        grades = [{"courseCode": "INORG", "matricNo": "2894029", "alphanum": "B2"},
                  {"courseCode": "PHYS", "matricNo": "2283853", "alphanum": "D2"}]

        response = self.client.post("/api/grades/", grades, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        student = Student.objects.get(matricNo="2894029")
        self.assertTrue(student.gradeDataUpdated)

        student = Student.objects.get(matricNo="2283853")
        self.assertTrue(student.gradeDataUpdated)

    def test_grade_data_stored(self):
        data = [{"courseCode": "INORG", "matricNo": "2894029", "alphanum": "B2"},
                {"courseCode": "PHYS", "matricNo": "2283853", "alphanum": "D2"}]
        serializer = GradeSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
        grade1 = Grade.objects.filter(courseCode="INORG", matricNo="2894029", alphanum="B2").exists()
        grade2 = Grade.objects.filter(courseCode="PHYS", matricNo="2283853", alphanum="D2").exists()
        self.assertTrue(grade1)
        self.assertTrue(grade2)

    def test_get_grade_object(self):
        response = self.client.get('/api/grades/')

        expected_dict = [{"courseCode": "CHEM_3012", "matricNo": "2894029", "alphanum": "C1"},
                         {"courseCode": "CHEM_3009", "matricNo": "2894029", "alphanum": "C2"},
                         {"courseCode": "CHEM_3014", "matricNo": "2894029", "alphanum": "D3"},
                         {"courseCode": "CHEM_4003P", "matricNo": "2894029", "alphanum": "B1"},
                         {"courseCode": "CHEM_4014", "matricNo": "2894029", "alphanum": "C1"},
                         {"courseCode": "CHEM_4012", "matricNo": "2894029", "alphanum": "C3"},
                         {"courseCode": "CHEM_4009", "matricNo": "2894029", "alphanum": "A1"},
                         {"courseCode": "CHEM_4001", "matricNo": "2894029", "alphanum": "A3"},
                         ]

        response = response.content.decode('utf-8')
        response_dict = json.loads(response)
        self.assertEqual(response_dict, expected_dict)

    def test_duplicate_grade_entries_not_created(self):
        grade = [{"courseCode": "CHEM_3012", "matricNo": "2894029", "alphanum": "C1"}]
        response = self.client.post("/api/grades/", grade, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
