from rest_framework import status

from api.models import Grade, Student, AcademicPlan
from rest_framework.test import APITestCase


class TempResetDatabaseTestCase(APITestCase):

    def setUp(self):
        AcademicPlan.objects.get_or_create(planCode="F100-2208", courseCode="CHEM-4H", mcName="Chemistry, BSc",
                                           mcCode="2208", course_1="CHEM_3012", weight_1=0.5, course_2="CHEM_3009",
                                           weight_2=0.5)
        Student.objects.get_or_create(matricNo="2894029", givenNames="Zak1", surname="Bagans",
                                      academicPlan=AcademicPlan.objects.get(planCode="F100-2208"), finalAward=0)

        student = Student.objects.get(matricNo="2894029")
        Grade.objects.get_or_create(courseCode="CHEM_3012", matricNo=student, alphanum="C1")
        Grade.objects.get_or_create(courseCode="CHEM_3009", matricNo=student, alphanum="C2")
        student.gradeDataUpdated = True
        student.save()

    def test_temp_reset_database_resets_the_database(self):
        response = self.client.post('/api/reset_database/')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(0, AcademicPlan.objects.all().count())
        self.assertEqual(0, Student.objects.all().count())
        self.assertEqual(0, Grade.objects.all().count())
