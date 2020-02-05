from api.models import Grade, Student, AcademicPlan
from rest_framework import status
from rest_framework.test import APITestCase


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

        student = Student.objects.get(matricNo="2894029")
        Grade.objects.get_or_create(courseCode="CHEM_3012", matricNo=student, alphanum="C1")
        Grade.objects.get_or_create(courseCode="CHEM_3009", matricNo=student, alphanum="C2")
        Grade.objects.get_or_create(courseCode="CHEM_3014", matricNo=student, alphanum="D3")
        Grade.objects.get_or_create(courseCode="CHEM_4003P", matricNo=student, alphanum="B1")
        Grade.objects.get_or_create(courseCode="CHEM_4014", matricNo=student, alphanum="C1")
        Grade.objects.get_or_create(courseCode="CHEM_4012", matricNo=student, alphanum="C3")
        Grade.objects.get_or_create(courseCode="CHEM_4009", matricNo=student, alphanum="A1")
        Grade.objects.get_or_create(courseCode="CHEM_4001", matricNo=student, alphanum="A3")
        student.gradeDataUpdated = True
        student.save()
        self.student = student

    def test_final_award_is_calculated_correctly(self):
        response = self.client.post('/api/calculate/')

        student = Student.objects.get(matricNo="2894029")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(student.finalAward, 16)
