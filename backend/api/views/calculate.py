from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

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

            for grade in grades:

                numerical_score = grade.get_alphanum_as_num()
                for i, co in enumerate(courses):
                    if co == grade.courseCode:
                        weight = weights[i]
                        overall_points += numerical_score * weight
                        break

            student.finalAward = round(overall_points)
            student.save()

        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
