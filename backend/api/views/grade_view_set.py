from rest_framework import status, generics
from rest_framework.mixins import ListModelMixin

from rest_framework.response import Response

from api.models import Grade, Student
from api.serializers import GradeSerializer
from django.db.utils import IntegrityError

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
class GradeViewSet(generics.ListCreateAPIView, ListModelMixin):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    pagination_class = None

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = GradeSerializer(data=data, many=True)
        if serializer.is_valid():
            try:
                serializer.save()
                Student.objects.filter(matricNo__in=(m["matricNo"] for m in data)).update(gradeDataUpdated=True)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response("Data already exists", status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
