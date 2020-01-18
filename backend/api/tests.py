from api.serializers import GradeSerializer, StudentSerializer
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

    def test_post_grade_data(self):
        grade = [{"courseCode": "ORGCHEM", "matricNo": "1234567", "alphanum": "C2"}]
        response = self.client.post("/api/grades/", grade, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

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


class StudentTestCase(APITestCase):

    def setUp(self):
        AcademicPlan.objects.get_or_create(planCode="CHEM_1234", courseCode="Chemist", mcName="abcde", mcCode="1234",
                                           course_1="PSD", weight_1=1)
        AcademicPlan.objects.get_or_create(planCode="CHEM_4321", courseCode="Alchemy", mcName="edcbe", mcCode="4321",
                                           course_1="ALGS", weight_1=1)

    def test_post_student_data(self):
        student = [{"matricNo": "1234567", "givenNames": "Philip J", "surname": "Fry", "academicPlan": "CHEM_1234",
                    "finalAward": ""}]
        response = self.client.post("/api/students/", student, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_student_data_stored(self):
        data = [{"matricNo": "1234567", "givenNames": "Philip J", "surname": "Fry", "academicPlan": "CHEM_1234",
                 "finalAward": ""},
                {"matricNo": "7654321", "givenNames": "Hermes", "surname": "Conrad", "academicPlan": "CHEM_4321",
                 "finalAward": ""}]
        serializer = StudentSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
        student1 = Student.objects.filter(matricNo="1234567", givenNames="Philip J", surname="Fry",
                                          academicPlan="CHEM_1234", finalAward="").exists()
        student2 = Student.objects.filter(matricNo="7654321", givenNames="Hermes", surname="Conrad",
                                          academicPlan="CHEM_4321", finalAward="").exists()
        self.assertTrue(student1)
        self.assertTrue(student2)

    def test_get_student_object(self):
        Student.objects.get_or_create(matricNo="1234567", givenNames="Lionel", surname="Hutz",
                                      academicPlan=AcademicPlan.objects.get(planCode="CHEM_1234"), finalAward="")
        response = self.client.get('/api/students/')
        response = response.content.decode('utf-8')
        response_dict = json.loads(response)
        self.assertEqual(response_dict, [{"matricNo": "1234567", "givenNames": "Lionel", "surname": "Hutz",
                                          "academicPlan": "CHEM_1234", "finalAward": ""}])

    def test_duplicate_student_entries_not_created(self):
        Student.objects.get_or_create(matricNo="7654321", givenNames="Zak", surname="Bagans",
                                      academicPlan=AcademicPlan.objects.get(planCode="CHEM_4321"), finalAward="")
        student = [{"matricNo": "7654321", "givenNames": "Zak", "surname": "Bagans",
                    "academicPlan": "CHEM_4321", "finalAward": ""}]
        response = self.client.post("/api/students/", student, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
