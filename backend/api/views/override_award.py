from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import Student


@api_view(("POST",))
def override_award(request):

    user = request.user
    if not user.is_authenticated:
        return Response(status=status.HTTP_403_FORBIDDEN)
    if request.method == "POST":
        matric_no = request.data.get("matricNo")
        new_grade = request.data.get("updatedAward")

        student = Student.objects.get(matricNo=matric_no)

        student.updatedAward = new_grade
        student.save()

    return Response(status=status.HTTP_200_OK)
