from django.db import models


class AcademicPlan(models.Model):
    planCode = models.CharField('Academic Plan Code', max_length=9, unique=True, primary_key=True)
    courseCode = models.CharField('Internal Course Code', max_length=15)
    mcName = models.CharField('MyCampus Name', max_length=6)
    mcCode = models.CharField('MyCampus Code', max_length=4)
    course_1 = models.CharField('Module 1', max_length=10, blank=True, null=True)
    weight_1 = models.FloatField('Weight 1', blank=True, null=True)
    course_2 = models.CharField('Module 2', max_length=10, blank=True, null=True)
    weight_2 = models.FloatField('Weight 2', blank=True, null=True)
    course_3 = models.CharField('Module 3', max_length=10, blank=True, null=True)
    weight_3 = models.FloatField('Weight 3', blank=True, null=True)
    course_4 = models.CharField('Module 4', max_length=10, blank=True, null=True)
    weight_4 = models.FloatField('Weight 4', blank=True, null=True)
    course_5 = models.CharField('Module 5', max_length=10, blank=True, null=True)
    weight_5 = models.FloatField('Weight 5', blank=True, null=True)
    course_6 = models.CharField('Module 6', max_length=10, blank=True, null=True)
    weight_6 = models.FloatField('Weight 6', blank=True, null=True)
    course_7 = models.CharField('Module 7', max_length=10, blank=True, null=True)
    weight_7 = models.FloatField('Weight 7', blank=True, null=True)
    course_8 = models.CharField('Module 8', max_length=10, blank=True, null=True)
    weight_8 = models.FloatField('Weight 8', blank=True, null=True)
    course_9 = models.CharField('Module 9', max_length=10, blank=True, null=True)
    weight_9 = models.FloatField('Weight 9', blank=True, null=True)
    course_10 = models.CharField('Module 10', max_length=10, blank=True, null=True)
    weight_10 = models.FloatField('Weight 10', blank=True, null=True)
    course_11 = models.CharField('Module 11', max_length=10, blank=True, null=True)
    weight_11 = models.FloatField('Weight 11', blank=True, null=True)
    course_12 = models.CharField('Module 12', max_length=10, blank=True, null=True)
    weight_12 = models.FloatField('Weight 12', blank=True, null=True)
    course_13 = models.CharField('Module 13', max_length=10, blank=True, null=True)
    weight_13 = models.FloatField('Weight 13', blank=True, null=True)
    course_14 = models.CharField('Module 14', max_length=10, blank=True, null=True)
    weight_14 = models.FloatField('Weight 14', blank=True, null=True)
    course_15 = models.CharField('Module 15', max_length=10, blank=True, null=True)
    weight_15 = models.FloatField('Weight 15', blank=True, null=True)

    def __str__(self):
        return self.planCode


class Student(models.Model):
    matricNo = models.CharField('Student', max_length=7, unique=True, primary_key=True)
    givenNames = models.CharField('Given name(s)', max_length=40)
    surname = models.CharField('Last name', max_length=25)
    academicPlan = models.ForeignKey(AcademicPlan, on_delete=models.CASCADE, null=True)
    finalAward = models.CharField('Final award', max_length=2, blank=True, default="NC")

    def __str__(self):
        return self.surname + ", " + self.givenNames


class Grade(models.Model):
    courseCode = models.CharField('Course Code', max_length=30)
    matricNo = models.CharField('Student', max_length=7)
    alphanum = models.CharField('Alphanumeric Grade', max_length=2)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['courseCode', 'matricNo'], name='composite_key')]
