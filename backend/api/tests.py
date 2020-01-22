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
                    "finalAward": 0}]
        response = self.client.post("/api/students/", student, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_student_data_stored(self):
        data = [{"matricNo": "1234567", "givenNames": "Philip J", "surname": "Fry", "academicPlan": "CHEM_1234",
                 "finalAward": 0},
                {"matricNo": "7654321", "givenNames": "Hermes", "surname": "Conrad", "academicPlan": "CHEM_4321",
                 "finalAward": 0}]
        serializer = StudentSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
        student1 = Student.objects.filter(matricNo="1234567", givenNames="Philip J", surname="Fry",
                                          academicPlan="CHEM_1234", finalAward=0).exists()
        student2 = Student.objects.filter(matricNo="7654321", givenNames="Hermes", surname="Conrad",
                                          academicPlan="CHEM_4321", finalAward=0).exists()
        self.assertTrue(student1)
        self.assertTrue(student2)

    def test_get_student_object(self):
        Student.objects.get_or_create(matricNo="1234567", givenNames="Lionel", surname="Hutz",
                                      academicPlan=AcademicPlan.objects.get(planCode="CHEM_1234"), finalAward=0)
        response = self.client.get('/api/students/')
        response = response.content.decode('utf-8')
        response_dict = json.loads(response)
        self.assertEqual(response_dict, [{"matricNo": "1234567", "givenNames": "Lionel", "surname": "Hutz",
                                          "academicPlan": "CHEM_1234", "finalAward": 0}])

    def test_duplicate_student_entries_not_created(self):
        Student.objects.get_or_create(matricNo="7654321", givenNames="Zak", surname="Bagans",
                                      academicPlan=AcademicPlan.objects.get(planCode="CHEM_4321"), finalAward=0)
        student = [{"matricNo": "7654321", "givenNames": "Zak", "surname": "Bagans",
                    "academicPlan": "CHEM_4321", "finalAward": 0}]
        response = self.client.post("/api/students/", student, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class FinalAwardTestCase(APITestCase):

    def setUp(self):
        AcademicPlan.objects.get_or_create(planCode="F100-2208", courseCode="CHEM-4H", mcName="Chemistry, BSc",
                                           mcCode="2208", course_1="CHEM_3012", weight_1=0.083, course_2="CHEM_3009",
                                           weight_2=0.083, course_3="CHEM_3014", weight_3=0.083, course_4="CHEM_4003P",
                                           weight_4=0.25, course_5="CHEM_4014", weight_5=0.125, course_6="CHEM_4012",
                                           weight_6=0.125, course_7="CHEM_4009", weight_7=0.125, course_8="CHEM_4001",
                                           weight_8=0.125)
        Student.objects.get_or_create(matricNo="2894029", givenNames="Zak", surname="Bagans",
                                      academicPlan=AcademicPlan.objects.get(planCode="F100-2208"), finalAward=0)
        Grade.objects.get_or_create(courseCode="CHEM_3012", matricNo=Student.objects.get(matricNo="2894029"),
                                    alphanum="C1")
        Grade.objects.get_or_create(courseCode="CHEM_3009", matricNo=Student.objects.get(matricNo="2894029"),
                                    alphanum="C2")
        Grade.objects.get_or_create(courseCode="CHEM_3014", matricNo=Student.objects.get(matricNo="2894029"),
                                    alphanum="D3")
        Grade.objects.get_or_create(courseCode="CHEM_4003P", matricNo=Student.objects.get(matricNo="2894029"),
                                    alphanum="B1")
        Grade.objects.get_or_create(courseCode="CHEM_4014", matricNo=Student.objects.get(matricNo="2894029"),
                                    alphanum="C1")
        Grade.objects.get_or_create(courseCode="CHEM_4012", matricNo=Student.objects.get(matricNo="2894029"),
                                    alphanum="C3")
        Grade.objects.get_or_create(courseCode="CHEM_4009", matricNo=Student.objects.get(matricNo="2894029"),
                                    alphanum="A1")
        Grade.objects.get_or_create(courseCode="CHEM_4001", matricNo=Student.objects.get(matricNo="2894029"),
                                    alphanum="A3")

    def test_correct_final_award(self):
        response = self.client.post('/api/calculate/')
        student = Student.objects.get(matricNo="2894029")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(student.finalAward, 16)
