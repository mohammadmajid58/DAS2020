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

    def get_courses(self):
        return [
            self.course_1, self.course_2, self.course_3, self.course_4, self.course_5,
            self.course_6, self.course_7, self.course_8, self.course_9, self.course_10,
            self.course_11, self.course_12, self.course_13, self.course_14, self.course_15,
        ]

    def get_weights(self):
        return [
            self.weight_1, self.weight_2, self.weight_3, self.weight_4, self.weight_5,
            self.weight_6, self.weight_7, self.weight_8, self.weight_9, self.weight_10,
            self.weight_11, self.weight_12, self.weight_13, self.weight_14, self.weight_15,
        ]

    def __str__(self):
        return self.planCode


class Student(models.Model):
    matricNo = models.CharField('Student', max_length=7, unique=True, primary_key=True)
    givenNames = models.CharField('Given name(s)', max_length=40)
    surname = models.CharField('Last name', max_length=25)
    academicPlan = models.ForeignKey(AcademicPlan, on_delete=models.CASCADE, null=True)
    finalAward = models.IntegerField('Final award', blank=True, default=0)

    def __str__(self):
        return self.surname + ", " + self.givenNames


class Grade(models.Model):
    courseCode = models.CharField('Course Code', max_length=30)
    matricNo = models.ForeignKey(Student, on_delete=models.CASCADE, db_column='matricNo')
    alphanum = models.CharField('Alphanumeric Grade', max_length=2)

    alpha_to_num = {"A1": 22, "A2": 21, "A3": 20, "A4": 19, "A5": 18, "B1": 17, "B2": 16, "B3": 15, "C1": 14,
                    "C2": 13, "C3": 12, "D1": 11, "D2": 10, "D3": 9, "E1": 8, "E2": 7,
                    "E3": 6, "F1": 5, "F2": 4, "F3": 3, "G1": 2, "G2": 1, "H": 0}

    class Meta:
        constraints = [models.UniqueConstraint(fields=['courseCode', 'matricNo'], name='composite_key')]

    def get_alphanum_as_num(self):
        return self.alpha_to_num[self.alphanum]
