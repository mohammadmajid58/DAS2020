from django.contrib.auth.models import User

from django.shortcuts import render
from rest_framework import viewsets, status, generics

from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import Grade, Student
from api.serializers import UserSerializer, GradeSerializer, StudentSerializer
from django.db.utils import IntegrityError


def index(request):
    return render(request, "build/index.html")


@api_view(('POST',))
def calculate(request):
    if request.method == "POST":
        students = Student.objects.all()

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


class UserViewSet(viewsets.ModelViewSet):
    # API endpoint that allows users to be viewed or edited
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GradeViewSet(generics.ListCreateAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    pagination_class = None

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = GradeSerializer(data=data, many=True)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response("Data already exists", status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
