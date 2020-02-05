from api.serializers import GradeSerializer
import json
from api.models import Grade, Student, AcademicPlan
from rest_framework import status
from rest_framework.test import APITestCase


class GradeTestCase(APITestCase):

    def setUp(self):
        AcademicPlan.objects.get_or_create(planCode="CHEM_1234", courseCode="Chemist", mcName="abcde", mcCode="1234",
                                           course_1="PSD", weight_1=1)
        Student.objects.get_or_create(matricNo="1234567", givenNames="Barry", surname="Burton",
                                      academicPlan=AcademicPlan.objects.get(planCode="CHEM_1234"))
        Student.objects.get_or_create(matricNo="2283653", givenNames="Barry", surname="Burton",
                                      academicPlan=AcademicPlan.objects.get(planCode="CHEM_1234"))

    def test_post_grade_data_sets_student_grade_data_updated(self):
        grades = [{"courseCode": "ORGCHEM", "matricNo": "1234567", "alphanum": "C2"},
                  {"courseCode": "ORGCHEM", "matricNo": "2283653", "alphanum": "B1"}]

        response = self.client.post("/api/grades/", grades, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        student = Student.objects.get(matricNo="1234567")
        self.assertTrue(student.gradeDataUpdated)

        student = Student.objects.get(matricNo="2283653")
        self.assertTrue(student.gradeDataUpdated)

    def test_grade_data_stored(self):
        data = [{"courseCode": "INORG", "matricNo": "1234567", "alphanum": "B2"},
                {"courseCode": "PHYS", "matricNo": "2283653", "alphanum": "D2"}]
        serializer = GradeSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
        grade1 = Grade.objects.filter(courseCode="INORG", matricNo="1234567", alphanum="B2").exists()
        grade2 = Grade.objects.filter(courseCode="INORG", matricNo="1234567", alphanum="B2").exists()
        self.assertTrue(grade1)
        self.assertTrue(grade2)

    def test_get_grade_object(self):
        Grade.objects.get_or_create(courseCode="INORG", matricNo=Student.objects.get(matricNo="1234567"), alphanum="B2")
        response = self.client.get('/api/grades/')
        response = response.content.decode('utf-8')
        response_dict = json.loads(response)
        self.assertEqual(response_dict, [{"courseCode": "INORG", "matricNo": "1234567", "alphanum": "B2"}])

    def test_duplicate_grade_entries_not_created(self):
        Grade.objects.get_or_create(courseCode="PHYS", matricNo=Student.objects.get(matricNo="1234567"), alphanum="E2")
        grade = [{"courseCode": "PHYS", "matricNo": "1234567", "alphanum": "E2"}]
        response = self.client.post("/api/grades/", grade, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
