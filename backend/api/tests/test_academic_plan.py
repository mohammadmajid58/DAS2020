from django.core.exceptions import ValidationError

from api.models import AcademicPlan, GraduationYear, Student, Grade

from .test_setup_function import setup
from rest_framework.test import APITestCase


class AcademicPlanTestCase(APITestCase):

    def setUp(self):
        setup(self)

    def _assert_plan_with_code_exists(self, code):
        self.assertTrue(AcademicPlan.objects.filter(planCode=code).exists())

    def _assert_plan_with_code_does_not_exist(self, code):
        self.assertFalse(AcademicPlan.objects.filter(planCode=code).exists())

    def test_changing_course_code_cascades_to_grades(self):
        student = Student.objects.get_or_create(matricNo="1234567", givenNames="New", surname="Student",
                                                academicPlan=AcademicPlan.objects.get(planCode="F100-2208"),
                                                gradYear=GraduationYear.objects.get(gradYear="19-20"), finalAward1=0.0,
                                                finalAward2=0.00, finalAward3=0.000)[0]
        Grade.objects.get_or_create(courseCode="CHEM_3012", matricNo=student, alphanum="A1")

        plan = AcademicPlan.objects.get(planCode="F100-2208")
        plan.course_1 = "CHEM_9999"
        plan.save()

        grade = Grade.objects.get(matricNo=student, alphanum="A1")
        self.assertNotEqual(grade.courseCode, "CHEM_3012")
        self.assertEqual(grade.courseCode, "CHEM_9999")

    def test_weights_sum_correctly(self):
        AcademicPlan.objects.create(planCode="TEST_a", courseCode="Chemist", mcName="abcde",
                                    gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                    course_1="PSD", weight_1=0.9)
        AcademicPlan.objects.create(planCode="TEST_b", courseCode="Chemist", mcName="abcde",
                                    gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                    course_1="PSD", weight_1=0)
        AcademicPlan.objects.create(planCode="TEST_c", courseCode="Chemist", mcName="abcde",
                                    gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                    course_1="PSD", weight_1=1)
        AcademicPlan.objects.create(planCode="TEST_d", courseCode="Chemist", mcName="abcde",
                                    gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                    course_1="PSD", weight_1=0.5, course_2="c2", weight_2=0.5)
        AcademicPlan.objects.create(planCode="TEST_e", courseCode="Chemist", mcName="abcde",
                                    gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                    course_1="PSD", weight_1=0.25, course_2="c2", weight_2=0.25, course_3="c3",
                                    weight_3=0.5)
        AcademicPlan.objects.create(planCode="TEST_f", courseCode="Chemist", mcName="abcde",
                                    gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                    course_1="PSD", weight_1=0.999)
        AcademicPlan.objects.create(planCode="TEST_g", courseCode="Chemist", mcName="abcde",
                                    gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                    course_1="PSD", weight_1=0.25, course_2="c2", weight_2=0.25, course_3="c3",
                                    weight_3=0.5001)
        AcademicPlan.objects.create(planCode="TEST_h", courseCode="Chemist", mcName="abcde",
                                    gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                    course_1="PSD", weight_1=0.25, course_2="c2", weight_2=0.25, course_3="c3",
                                    weight_3=0.4998)

        codes_that_should_exist = ["c", "d", "e", "f", "h", "g"]
        for code in codes_that_should_exist:
            self._assert_plan_with_code_exists("TEST_" + code)

        codes_that_should_not_exist = ["a", "b"]
        for code in codes_that_should_not_exist:
            self._assert_plan_with_code_does_not_exist("TEST_" + code)

    def test_duplicate_course_names(self):
        plan = AcademicPlan.objects.get_or_create(gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                                  planCode="F100-2299", courseCode="CHEM-4H", mcName="Chemistry, BSc",
                                                  course_1="CHEM_3012", weight_1=0.25, course_2="CHEM_3009",
                                                  weight_2=0.25, course_3="CHEM_3012", weight_3=0.25,
                                                  course_4="CHEM_3014", weight_4=0.25)
        with self.assertRaises(ValidationError):
            plan[0].clean()

    def test_corresponding_weight_exists(self):
        with self.assertRaises(ValidationError):
            AcademicPlan.objects.get_or_create(gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                               planCode="F100-2299", courseCode="CHEM-4H",
                                               mcName="Chemistry, BSc",
                                               course_1="CHEM_3012", weight_1=0.25, course_2="CHEM_3009",
                                               weight_2=0.25, course_3="CHEM_4001", weight_3=0.25,
                                               course_4="CHEM_3014")

    def test_corresponding_course_exists(self):
        with self.assertRaises(ValidationError):
            AcademicPlan.objects.get_or_create(gradYear=GraduationYear.objects.get(gradYear="19-20"),
                                               planCode="F100-2299", courseCode="CHEM-4H",
                                               mcName="Chemistry, BSc",
                                               course_1="CHEM_3012", weight_1=0.25, course_2="CHEM_3009",
                                               weight_2=0.25, course_3="CHEM_4001", weight_3=0.25,
                                               weight_4=0.25)
