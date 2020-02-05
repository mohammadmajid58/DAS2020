from api.models import AcademicPlan
from rest_framework.test import APITestCase


class AcademicPlanTestCase(APITestCase):

    def _assert_plan_with_code_exists(self, code):
        print("TEST_" + code + " " + str(AcademicPlan.objects.filter(planCode=code).exists()))
        self.assertTrue(AcademicPlan.objects.filter(planCode=code).exists())

    def _assert_plan_with_code_does_not_exist(self, code):
        print("TEST_" + code + " " + str(AcademicPlan.objects.filter(planCode=code).exists()))
        self.assertFalse(AcademicPlan.objects.filter(planCode=code).exists())

    def test_weights_sum_correctly(self):
        AcademicPlan.objects.create(planCode="TEST_a", courseCode="Chemist", mcName="abcde", mcCode="1234",
                                    course_1="PSD", weight_1=0.9)
        AcademicPlan.objects.create(planCode="TEST_b", courseCode="Chemist", mcName="abcde", mcCode="1234",
                                    course_1="PSD", weight_1=0)
        AcademicPlan.objects.create(planCode="TEST_c", courseCode="Chemist", mcName="abcde", mcCode="1234",
                                    course_1="PSD", weight_1=1)
        AcademicPlan.objects.create(planCode="TEST_d", courseCode="Chemist", mcName="abcde", mcCode="1234",
                                    course_1="PSD", weight_1=0.5, course_2="c2", weight_2=0.5)
        AcademicPlan.objects.create(planCode="TEST_e", courseCode="Chemist", mcName="abcde", mcCode="1234",
                                    course_1="PSD", weight_1=0.25, course_2="c2", weight_2=0.25, course_3="c3",
                                    weight_3=0.5)
        AcademicPlan.objects.create(planCode="TEST_f", courseCode="Chemist", mcName="abcde", mcCode="1234",
                                    course_1="PSD", weight_1=0.999)
        AcademicPlan.objects.create(planCode="TEST_g", courseCode="Chemist", mcName="abcde", mcCode="1234",
                                    course_1="PSD", weight_1=0.25, course_2="c2", weight_2=0.25, course_3="c3",
                                    weight_3=0.5001)
        AcademicPlan.objects.create(planCode="TEST_h", courseCode="Chemist", mcName="abcde", mcCode="1234",
                                    course_1="PSD", weight_1=0.25, course_2="c2", weight_2=0.25, course_3="c3",
                                    weight_3=0.4998)

        codes_that_should_exist = ["c", "d", "e", "f", "h", "g"]
        for code in codes_that_should_exist:
            self._assert_plan_with_code_exists("TEST_" + code)

        codes_that_should_not_exist = ["a", "b"]
        for code in codes_that_should_not_exist:
            self._assert_plan_with_code_does_not_exist("TEST_" + code)
