from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.grade_converter import new_grade_in_higher_band
from api.models import Grade, Student


@api_view(('POST',))
def calculate(request):
    user = request.user
    if not user.is_authenticated:
        return Response(status=status.HTTP_403_FORBIDDEN)
    if request.method == "POST":
        students = Student.objects.filter(gradeDataUpdated=True)

        for student in students:
            academic_plan = student.academicPlan
            weights = academic_plan.get_weights()
            courses = academic_plan.get_courses()

            grades = Grade.objects.filter(matricNo=student.matricNo)
            overall_points = 0
            is_missing_grades = False
            has_special_code = False
            academic_plan_course_count = sum([1 if c is not None else 0 for c in courses])

            if academic_plan_course_count != len(grades):
                is_missing_grades = True

            for grade in grades:
                if grade.is_grade_a_special_code():
                    has_special_code = True
                    continue

                if grade.courseCode not in courses:
                    is_missing_grades = True
                    continue

                numerical_score = grade.get_alphanum_as_num()
                for i, co in enumerate(courses):
                    if co == grade.courseCode:
                        weight = weights[i]
                        overall_points += numerical_score * weight
                        break

            oldGrade = student.finalAward3
            student.finalAward3 = overall_points
            student.set_is_missing_grades(is_missing_grades)
            student.set_has_special_code(has_special_code)
            student.unset_grade_data_updated()
            if new_grade_in_higher_band(oldGrade, overall_points):
                student.updatedAward = "-1"
            student.save()

        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
