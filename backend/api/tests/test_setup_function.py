from django.contrib.auth.models import User

from api.models import AcademicPlan, Student, Grade, GraduationYear


def setup(self):
    GraduationYear.objects.get_or_create(gradYear="19-20")

    AcademicPlan.objects.get_or_create(gradYear=GraduationYear.objects.get(gradYear="19-20"), planCode="F100-2208",
                                       courseCode="CHEM-4H", mcName="Chemistry, BSc",
                                       course_1="CHEM_3012", weight_1=0.083, course_2="CHEM_3009",
                                       weight_2=0.083, course_3="CHEM_3014", weight_3=0.083, course_4="CHEM_4003P",
                                       weight_4=0.25, course_5="CHEM_4014", weight_5=0.125, course_6="CHEM_4012",
                                       weight_6=0.125, course_7="CHEM_4009", weight_7=0.125, course_8="CHEM_4001",
                                       weight_8=0.125)

    Student.objects.get_or_create(matricNo="2894029", givenNames="Zak", surname="Bagans",
                                  academicPlan=AcademicPlan.objects.get(planCode="F100-2208"),
                                  gradYear=GraduationYear.objects.get(gradYear="19-20"), finalAward1=0.0,
                                  finalAward2=0.00, finalAward3=0.000)
    Student.objects.get_or_create(matricNo="2283853", givenNames="Robert", surname="Goulet",
                                  academicPlan=AcademicPlan.objects.get(planCode="F100-2208"),
                                  gradYear=GraduationYear.objects.get(gradYear="19-20"), finalAward1=0.0,
                                  finalAward2=0.00, finalAward3=0.000)

    student = Student.objects.get(matricNo="2894029")
    Grade.objects.get_or_create(courseCode="CHEM_3012", matricNo=student, alphanum="C1")
    Grade.objects.get_or_create(courseCode="CHEM_3009", matricNo=student, alphanum="C2")
    Grade.objects.get_or_create(courseCode="CHEM_3014", matricNo=student, alphanum="D3")
    Grade.objects.get_or_create(courseCode="CHEM_4003P", matricNo=student, alphanum="B1")
    Grade.objects.get_or_create(courseCode="CHEM_4014", matricNo=student, alphanum="C1")
    Grade.objects.get_or_create(courseCode="CHEM_4012", matricNo=student, alphanum="C3")
    Grade.objects.get_or_create(courseCode="CHEM_4009", matricNo=student, alphanum="A1")
    Grade.objects.get_or_create(courseCode="CHEM_4001", matricNo=student, alphanum="A3")
    student.gradeDataUpdated = True
    student.save()
    self.student = student


def login(client):
    user = User.objects.get_or_create(username="admin")[0]
    user.is_staff = True
    user.is_superuser = True
    user.save()

    user.set_password("adminadmin")
    user.save()
    client.login(username="admin", password="adminadmin")
