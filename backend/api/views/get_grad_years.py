from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import GraduationYear


@api_view(('GET',))
def get_grad_years(request):
    user = request.user
    if not user.is_authenticated:
        return Response(status=status.HTTP_403_FORBIDDEN)
    if request.method == "GET":
        grad_years = GraduationYear.objects.all()
        formatted_grad_years = [year.gradYear for year in grad_years]
        return Response(formatted_grad_years, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
