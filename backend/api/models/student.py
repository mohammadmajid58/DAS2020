from django.db import models
from api.models import AcademicPlan


class Student(models.Model):
    matricNo = models.CharField('Student', max_length=7, unique=True, primary_key=True)
    givenNames = models.CharField('Given name(s)', max_length=40)
    surname = models.CharField('Last name', max_length=25)
    academicPlan = models.ForeignKey(AcademicPlan, on_delete=models.CASCADE, null=True)
    finalAward = models.IntegerField('Final award', blank=True, default=0)
    gradeDataUpdated = models.BooleanField(default=False)

    def set_grade_data_updated(self):
        self.gradeDataUpdated = True
        self.save()

    def __str__(self):
        return self.surname + ", " + self.givenNames
