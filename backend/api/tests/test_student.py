from django.core.exceptions import ValidationError

from api.serializers import StudentSerializer
import json
from api.models import Student, AcademicPlan, GraduationYear
from rest_framework import status
from rest_framework.test import APITestCase
from .test_setup_function import setup, login


def _create_default_student():
    return {"matricNo": "2578812", "givenNames": "Phillip J", "surname": "Fry", "academicPlan": "F100-2208",
            "gradYear": "19-20"}


def _create_default_student_with_matric_no(matric_no):
    student = _create_default_student()
    student["matricNo"] = matric_no
    return student


class StudentTestCase(APITestCase):

    def setUp(self):
        login(self.client)
        setup(self)

    def test_post_student_data(self):
        student = [{"matricNo": "1234567", "givenNames": "Philip J", "surname": "Fry", "academicPlan": "F100-2208",
                    "gradYear": "19-20", "finalAward1": 0.0}]
        response = self.client.post("/api/students/", student, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_student_data_stored(self):
        data = [{"matricNo": "1234567", "givenNames": "Philip J", "surname": "Fry", "academicPlan": "F100-2208",
                 "gradYear": "19-20", "finalAward1": 0.0, "finalAward2": 0.00, "finalAward3": 0.000},
                {"matricNo": "7654321", "givenNames": "Hermes", "surname": "Conrad", "academicPlan": "F100-2208",
                 "gradYear": "19-20", "finalAward1": 0.0, "finalAward2": 0.00, "finalAward3": 0.000}]
        serializer = StudentSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
        student1 = Student.objects.filter(matricNo="1234567", givenNames="Philip J", surname="Fry",
                                          academicPlan="F100-2208",
                                          gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                          finalAward1=0.0, finalAward2=0.00,
                                          finalAward3=0.000).exists()
        student2 = Student.objects.filter(matricNo="7654321", givenNames="Hermes", surname="Conrad",
                                          academicPlan="F100-2208",
                                          gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                          finalAward1=0.0, finalAward2=0.00,
                                          finalAward3=0.000).exists()
        self.assertTrue(student1)
        self.assertTrue(student2)

    def test_get_student_object(self):
        response = self.client.get('/api/students/')
        response = response.content.decode('utf-8')
        response_dict = json.loads(response)
        self.assertEqual(response_dict, [{"matricNo": "2894029", "givenNames": "Zak", "surname": "Bagans",
                                          "academicPlan": "F100-2208",
                                          "gradYear": "19-20", "finalAward1": '0.0', "finalAward2": '0.00',
                                          "finalAward3": '0.000', "updatedAward": "-1", "isMissingGrades": True,
                                          "hasSpecialCode": False},
                                         {"matricNo": "2283853", "givenNames": "Robert", "surname": "Goulet",
                                          "academicPlan": "F100-2208",
                                          "gradYear": "19-20", "finalAward1": '0.0', "finalAward2": '0.00',
                                          "finalAward3": '0.000', "updatedAward": "-1", "isMissingGrades": True,
                                          "hasSpecialCode": False}])

    def test_duplicate_student_entries_not_created(self):
        student = [{"matricNo": "2894029", "givenNames": "Zak", "surname": "Bagans",
                    "academicPlan": "F100-2208",
                    "gradYear": "19-20", "finalAward1": 0.0, "finalAward2": None, "finalAward3": None}]
        response = self.client.post("/api/students/", student, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cannot_get_student_when_logged_out(self):
        self.client.logout()
        Student.objects.get_or_create(matricNo="1234567", givenNames="Lionel", surname="Hutz",
                                      academicPlan=AcademicPlan.objects.get(planCode="F100-2208"),
                                      gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                      finalAward1=None,
                                      finalAward2=None, finalAward3=0.000)
        response = self.client.get('/api/students/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_post_student_data_when_logged_out(self):
        self.client.logout()
        student = [{"matricNo": "1234567", "givenNames": "Philip J", "surname": "Fry", "academicPlan": "CHEM_1234",
                    "gradYear": "19-20", "finalAward1": None, "finalAward2": None, "finalAward3": 0.000}]
        response = self.client.post("/api/students/", student, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        student_exists = Student.objects.filter(matricNo="1234567", givenNames="Phillip J", surname="Fry",
                                                gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                                academicPlan="CHEM_1234", finalAward1=0.0, finalAward2=None,
                                                finalAward3=None).exists()
        self.assertFalse(student_exists)

    def test_gpa_decimals(self):
        matric_no = "1234567"
        data = [{"matricNo": matric_no, "givenNames": "Philip J", "surname": "Fry",
                 "academicPlan": "F100-2208", "gradYear": "19-20", "finalAward3": 1.200}]
        serializer = StudentSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()

        student = Student.objects.get(matricNo=matric_no)
        student.save()

        self.assertEqual(str(student.finalAward1), '1.2')
        self.assertEqual(str(student.finalAward2), '1.20')
        self.assertEqual(str(student.finalAward3), '1.200')

        student.finalAward1 = 1.23
        student.save()

        self.decimal_assertion()

        student.finalAward1 = 1.232
        student.save()

        self.decimal_assertion()

        final_award3_dec = str(student.finalAward3).partition('.')[-1]
        self.assertEqual(len(final_award3_dec), 3)

    def decimal_assertion(self):
        matric_no = "1234567"
        student = Student.objects.get(matricNo=matric_no)

        final_award1_dec = str(student.finalAward1).partition('.')[-1]
        self.assertEqual(len(final_award1_dec), 1)

        final_award2_dec = str(student.finalAward2).partition('.')[-1]
        self.assertEqual(len(final_award2_dec), 2)

    def test_student_matric_no_length_must_be_seven(self):
        student = _create_default_student()
        self.client.post("/api/students/", [student], format='json')
        self.assertTrue(Student.objects.filter(matricNo=student["matricNo"]).exists())

    def test_student_matric_no_length_cannot_be_length_six(self):
        student = _create_default_student_with_matric_no("123456")
        self.client.post("/api/students/", [student], format='json')
        self.assertFalse(Student.objects.filter(matricNo=student["matricNo"]).exists())

    def test_student_matric_no_length_cannot_be_length_eight(self):
        student = _create_default_student_with_matric_no("12345678")
        self.client.post("/api/students/", [student], format='json')
        self.assertFalse(Student.objects.filter(matricNo=student["matricNo"]).exists())

    def test_student_must_have_a_surname(self):
        student = _create_default_student()
        student.pop("surname", None)
        self.client.post("/api/students/", [student], format='json')
        self.assertFalse(Student.objects.filter(matricNo=student["matricNo"]).exists())

    def test_student_must_have_given_names(self):
        student = _create_default_student()
        student.pop("givenNames", None)
        self.client.post("/api/students/", [student], format='json')
        self.assertFalse(Student.objects.filter(matricNo=student["matricNo"]).exists())

    def test_student_must_have_an_academic_plan(self):
        student = _create_default_student()
        student.pop("academicPlan", None)
        self.client.post("/api/students/", [student], format='json')
        self.assertFalse(Student.objects.filter(matricNo=student["matricNo"]).exists())

    def test_student_can_have_several_given_names(self):
        student = _create_default_student()
        student["givenNames"] = "Hello I have ten given names hahaha I am awesome"
        self.client.post("/api/students/", [student], format='json')
        self.assertTrue(Student.objects.filter(matricNo=student["matricNo"]).exists())

    def test_student_matric_no_is_entirely_numeric(self):
        student = _create_default_student()
        student["matricNo"] = "123456a"
        try:
            self.client.post("/api/students/", [student], format='json')
        except ValidationError as v:
            self.assertEqual("['Student matric no must be a number.']", str(v))

        self.assertFalse(Student.objects.filter(matricNo=student["matricNo"]).exists())
