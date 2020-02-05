from rest_framework import status, generics

from rest_framework.response import Response

from api.models import Student
from api.serializers import StudentSerializer
from django.db.utils import IntegrityError


class StudentViewSet(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    pagination_class = None

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = StudentSerializer(data=data, many=True)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response("Data already exists", status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
