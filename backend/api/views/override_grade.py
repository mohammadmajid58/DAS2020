from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import Student, Grade


@api_view(("POST",))
def override_grade(request):

    user = request.user
    if not user.is_authenticated:
        return Response(status=status.HTTP_403_FORBIDDEN)
    if request.method == "POST":
        matric_no = request.data.get("matricNo")
        new_grade = request.data.get("alphanum")
        course_code = request.data.get("courseCode")

        student = Student.objects.get(matricNo=matric_no)
        grade, _ = Grade.objects.get_or_create(matricNo=student, courseCode=course_code)
        grade.alphanum = new_grade
        grade.save()

    return Response(status=status.HTTP_200_OK)
