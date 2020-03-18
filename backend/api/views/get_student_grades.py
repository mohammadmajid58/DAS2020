from rest_framework import status

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist

from api.grade_converter import convert_a
from api.models import Student, Grade


@api_view(("GET",))
def get_student_grades(request):
    user = request.user
    if not user.is_authenticated:
        return Response(status=status.HTTP_403_FORBIDDEN)

    matric_no = request.GET.get("matricNo")
    if matric_no is None:
        return Response("Bad Request No MatricNo Provided", status=status.HTTP_400_BAD_REQUEST)
    try:
        grades = Grade.objects.filter(matricNo=matric_no)
        student = Student.objects.get(matricNo=matric_no)
        all_courses = student.academicPlan.get_courses()
        stored_grades = {g.courseCode: g.alphanum for g in grades}

        all_grades = {course: stored_grades.get(course, "NA")
                      for course in all_courses if course is not None}
        special_codes = ["NA", "MV", "CR", "CW"]

        formatted_grades = [{"courseCode": c, "alphanum": a, "twentyTwoPoint": convert_a(a)
                            if a not in special_codes else "NA"} for c, a in all_grades.items()]
        return Response(formatted_grades, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return Response("Student with MatricNo " + matric_no + " not found", status=status.HTTP_404_NOT_FOUND)
