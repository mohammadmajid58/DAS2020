from decimal import Decimal

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import Grade, Student
import numpy as np


@api_view(('POST',))
def calculate(request):
    user = request.user
    if not user.is_authenticated:
        return Response(status=status.HTTP_403_FORBIDDEN)
    if request.method == "POST":
        selectedYears = request.data
        if len(selectedYears) > 0:
            students = Student.objects.filter(gradeDataUpdated=True, gradYear__in=selectedYears)
        else:
            students = Student.objects.filter(gradeDataUpdated=True)
        academic_plan_course_counts = {}
        academic_plan_course_weights = {}

        for student in students.iterator():
            academic_plan = student.academicPlan
            weights = academic_plan.get_weights()
            courses = academic_plan.get_courses()
            numerical_scores = []
            weight_list = []

            grades = Grade.objects.filter(matricNo=student.matricNo)
            is_missing_grades = False
            has_special_code = False
            if academic_plan.planCode not in academic_plan_course_counts.keys():
                academic_plan_course_counts[academic_plan.planCode] = sum(
                    [1 if c is not None else 0 for c in courses])

            if academic_plan.planCode not in academic_plan_course_weights.keys():
                plan_code = academic_plan.planCode
                academic_plan_course_weights[plan_code] = {}
                for i in range(academic_plan_course_counts[plan_code]):
                    academic_plan_course_weights[plan_code][courses[i]] = weights[i]

            if academic_plan_course_counts[academic_plan.planCode] != len(grades):
                is_missing_grades = True

            for grade in grades.iterator():
                if grade.is_grade_a_special_code():
                    has_special_code = True
                    continue

                if grade.courseCode not in courses:
                    is_missing_grades = True
                    continue

                numerical_scores.append(grade.get_alphanum_as_num())
                weight_list.append(academic_plan_course_weights[
                    academic_plan.planCode][grade.courseCode])

            overall_points = np.dot(weight_list, numerical_scores)
            student.finalAward1 = Decimal(round(overall_points, 1))
            student.finalAward2 = Decimal(round(overall_points, 2))
            student.finalAward3 = Decimal(round(overall_points, 3))
            student.set_is_missing_grades(is_missing_grades)
            student.set_has_special_code(has_special_code)

        students.update(gradeDataUpdated=False)

        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
