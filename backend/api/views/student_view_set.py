from rest_framework import status, generics

from rest_framework.response import Response

from api.models import Student
from api.serializers import StudentSerializer
from django.db.utils import IntegrityError
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import authentication_classes, permission_classes


@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
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

    def get(self, request, *args, **kwargs):
        matric_no = request.query_params.get("matricNo")
        student_list = request.GET.getlist("years")
        data = self.get_queryset().all()
        if len(student_list) > 0:
            data = data.filter(gradYear__in=student_list)
        if matric_no is None:
            serializer = StudentSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            try:
                student = data.get(matricNo=matric_no)
                serializer = StudentSerializer(student, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response("Student with MatricNo " + matric_no + " Doesn't Exist", status=status.HTTP_200_OK)
