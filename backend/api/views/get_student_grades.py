from rest_framework import status

from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.grade_converter import convert_a
from api.models import Student, Grade


@api_view(("GET",))
def get_student_grades(request):
    user = request.user
    if not user.is_authenticated:
        return Response(status=status.HTTP_403_FORBIDDEN)

    q = request.GET.get("q")
    grades = Grade.objects.filter(matricNo=q)
    student = Student.objects.get(matricNo=q)
    all_courses = student.academicPlan.get_courses()
    stored_grades = {g.courseCode: g.alphanum for g in grades}

    all_grades = {g: stored_grades[g] if g in stored_grades.keys() else "NA"
                  for g in all_courses[:all_courses.index(None)]}
    special_codes = ["NA", "MV", "CR", "CW"]

    formatted_grades = [{"courseCode": c, "alphanum": a, "twentyTwoPoint": convert_a(a)
                        if a not in special_codes else "NA"} for c, a in all_grades.items()]

    return Response(formatted_grades, status=status.HTTP_200_OK)
