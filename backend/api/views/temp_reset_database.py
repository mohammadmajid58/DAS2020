from rest_framework import status

from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import AcademicPlan, Grade, Student


@api_view(('POST',))
def temp_reset_database(request):
    if request.method == "POST":
        Grade.objects.all().delete()
        Student.objects.all().delete()
        AcademicPlan.objects.all().delete()
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
