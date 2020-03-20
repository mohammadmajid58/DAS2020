from django.core.exceptions import ValidationError

from api.serializers import GradeSerializer
import json
from api.models import Grade, Student, AcademicPlan, GraduationYear
from .test_setup_function import setup, login
from rest_framework import status
from rest_framework.test import APITestCase


class GradeTestCase(APITestCase):

    def setUp(self):
        login(self.client)
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

    def test_cannot_get_grades_when_logged_out(self):
        self.client.logout()
        response = self.client.get('/api/grades/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_post_grade_data_when_logged_out(self):
        self.client.logout()
        grade = [{"courseCode": "ORGCHEM", "matricNo": "1234567", "alphanum": "C2"}]
        response = self.client.post("/api/grades/", grade, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        grade_exists = Grade.objects.filter(courseCode="ORGCHEM", matricNo="1234567", alphanum="C2").exists()
        self.assertFalse(grade_exists)

    def test_cannot_update_grade_to_contain_invalid_course_code(self):
        student = Student.objects.get_or_create(matricNo="1234567", givenNames="New", surname="Student",
                                                academicPlan=AcademicPlan.objects.get(planCode="F100-2208"),
                                                gradYear=GraduationYear.objects.get(gradYear="19-20"), finalAward1=0.0,
                                                finalAward2=0.00, finalAward3=0.000)[0]

        Grade.objects.get_or_create(courseCode="CHEM_3012", matricNo=student, alphanum="A1")

        grade = Grade.objects.filter(courseCode="CHEM_3012", matricNo=student, alphanum="A1").first()
        grade.courseCode = "Hello"
        try:
            grade.save()
            self.fail("Course code does not exist in student's academic plan - exception was not thrown")
        except ValidationError:
            pass

        grade = Grade.objects.filter(courseCode="CHEM_3012", matricNo=student, alphanum="A1").exists()
        self.assertTrue(grade)
