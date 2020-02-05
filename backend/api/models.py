from django.db import models
from django.core.exceptions import ValidationError


class AcademicPlan(models.Model):
    planCode = models.CharField('Academic Plan Code', max_length=9, unique=True, primary_key=True)
    courseCode = models.CharField('Internal Course Code', max_length=15)
    mcName = models.CharField('MyCampus Name', max_length=6)
    mcCode = models.CharField('MyCampus Code', max_length=4)
    course_1 = models.CharField('Module 1', max_length=10, blank=True, null=True)
    weight_1 = models.DecimalField('Weight 1', blank=True, null=True, max_digits=4, decimal_places=3)
    course_2 = models.CharField('Module 2', max_length=10, blank=True, null=True)
    weight_2 = models.DecimalField('Weight 2', blank=True, null=True, max_digits=4, decimal_places=3)
    course_3 = models.CharField('Module 3', max_length=10, blank=True, null=True)
    weight_3 = models.DecimalField('Weight 3', blank=True, null=True, max_digits=4, decimal_places=3)
    course_4 = models.CharField('Module 4', max_length=10, blank=True, null=True)
    weight_4 = models.DecimalField('Weight 4', blank=True, null=True, max_digits=4, decimal_places=3)
    course_5 = models.CharField('Module 5', max_length=10, blank=True, null=True)
    weight_5 = models.DecimalField('Weight 5', blank=True, null=True, max_digits=4, decimal_places=3)
    course_6 = models.CharField('Module 6', max_length=10, blank=True, null=True)
    weight_6 = models.DecimalField('Weight 6', blank=True, null=True, max_digits=4, decimal_places=3)
    course_7 = models.CharField('Module 7', max_length=10, blank=True, null=True)
    weight_7 = models.DecimalField('Weight 7', blank=True, null=True, max_digits=4, decimal_places=3)
    course_8 = models.CharField('Module 8', max_length=10, blank=True, null=True)
    weight_8 = models.DecimalField('Weight 8', blank=True, null=True, max_digits=4, decimal_places=3)
    course_9 = models.CharField('Module 9', max_length=10, blank=True, null=True)
    weight_9 = models.DecimalField('Weight 9', blank=True, null=True, max_digits=4, decimal_places=3)
    course_10 = models.CharField('Module 10', max_length=10, blank=True, null=True)
    weight_10 = models.DecimalField('Weight 10', blank=True, null=True, max_digits=4, decimal_places=3)
    course_11 = models.CharField('Module 11', max_length=10, blank=True, null=True)
    weight_11 = models.DecimalField('Weight 11', blank=True, null=True, max_digits=4, decimal_places=3)
    course_12 = models.CharField('Module 12', max_length=10, blank=True, null=True)
    weight_12 = models.DecimalField('Weight 12', blank=True, null=True, max_digits=4, decimal_places=3)
    course_13 = models.CharField('Module 13', max_length=10, blank=True, null=True)
    weight_13 = models.DecimalField('Weight 13', blank=True, null=True, max_digits=4, decimal_places=3)
    course_14 = models.CharField('Module 14', max_length=10, blank=True, null=True)
    weight_14 = models.DecimalField('Weight 14', blank=True, null=True, max_digits=4, decimal_places=3)
    course_15 = models.CharField('Module 15', max_length=10, blank=True, null=True)
    weight_15 = models.DecimalField('Weight 15', blank=True, null=True, max_digits=4, decimal_places=3)
    course_16 = models.CharField('Module 16', max_length=10, blank=True, null=True)
    weight_16 = models.DecimalField('Weight 16', blank=True, null=True, max_digits=4, decimal_places=3)
    course_17 = models.CharField('Module 17', max_length=10, blank=True, null=True)
    weight_17 = models.DecimalField('Weight 17', blank=True, null=True, max_digits=4, decimal_places=3)
    course_18 = models.CharField('Module 18', max_length=10, blank=True, null=True)
    weight_18 = models.DecimalField('Weight 18', blank=True, null=True, max_digits=4, decimal_places=3)
    course_19 = models.CharField('Module 19', max_length=10, blank=True, null=True)
    weight_19 = models.DecimalField('Weight 19', blank=True, null=True, max_digits=4, decimal_places=3)
    course_20 = models.CharField('Module 20', max_length=10, blank=True, null=True)
    weight_20 = models.DecimalField('Weight 20', blank=True, null=True, max_digits=4, decimal_places=3)
    course_21 = models.CharField('Module 21', max_length=10, blank=True, null=True)
    weight_21 = models.DecimalField('Weight 21', blank=True, null=True, max_digits=4, decimal_places=3)
    course_22 = models.CharField('Module 22', max_length=10, blank=True, null=True)
    weight_22 = models.DecimalField('Weight 22', blank=True, null=True, max_digits=4, decimal_places=3)
    course_23 = models.CharField('Module 23', max_length=10, blank=True, null=True)
    weight_23 = models.DecimalField('Weight 23', blank=True, null=True, max_digits=4, decimal_places=3)
    course_24 = models.CharField('Module 24', max_length=10, blank=True, null=True)
    weight_24 = models.DecimalField('Weight 24', blank=True, null=True, max_digits=4, decimal_places=3)
    course_25 = models.CharField('Module 25', max_length=10, blank=True, null=True)
    weight_25 = models.DecimalField('Weight 25', blank=True, null=True, max_digits=4, decimal_places=3)
    course_26 = models.CharField('Module 26', max_length=10, blank=True, null=True)
    weight_26 = models.DecimalField('Weight 26', blank=True, null=True, max_digits=4, decimal_places=3)
    course_27 = models.CharField('Module 27', max_length=10, blank=True, null=True)
    weight_27 = models.DecimalField('Weight 27', blank=True, null=True, max_digits=4, decimal_places=3)
    course_28 = models.CharField('Module 28', max_length=10, blank=True, null=True)
    weight_28 = models.DecimalField('Weight 28', blank=True, null=True, max_digits=4, decimal_places=3)
    course_29 = models.CharField('Module 29', max_length=10, blank=True, null=True)
    weight_29 = models.DecimalField('Weight 29', blank=True, null=True, max_digits=4, decimal_places=3)
    course_30 = models.CharField('Module 30', max_length=10, blank=True, null=True)
    weight_30 = models.DecimalField('Weight 30', blank=True, null=True, max_digits=4, decimal_places=3)
    course_31 = models.CharField('Module 31', max_length=10, blank=True, null=True)
    weight_31 = models.DecimalField('Weight 31', blank=True, null=True, max_digits=4, decimal_places=3)
    course_32 = models.CharField('Module 32', max_length=10, blank=True, null=True)
    weight_32 = models.DecimalField('Weight 32', blank=True, null=True, max_digits=4, decimal_places=3)
    course_33 = models.CharField('Module 33', max_length=10, blank=True, null=True)
    weight_33 = models.DecimalField('Weight 33', blank=True, null=True, max_digits=4, decimal_places=3)
    course_34 = models.CharField('Module 34', max_length=10, blank=True, null=True)
    weight_34 = models.DecimalField('Weight 34', blank=True, null=True, max_digits=4, decimal_places=3)
    course_35 = models.CharField('Module 35', max_length=10, blank=True, null=True)
    weight_35 = models.DecimalField('Weight 35', blank=True, null=True, max_digits=4, decimal_places=3)
    course_36 = models.CharField('Module 36', max_length=10, blank=True, null=True)
    weight_36 = models.DecimalField('Weight 36', blank=True, null=True, max_digits=4, decimal_places=3)
    course_37 = models.CharField('Module 37', max_length=10, blank=True, null=True)
    weight_37 = models.DecimalField('Weight 37', blank=True, null=True, max_digits=4, decimal_places=3)
    course_38 = models.CharField('Module 38', max_length=10, blank=True, null=True)
    weight_38 = models.DecimalField('Weight 38', blank=True, null=True, max_digits=4, decimal_places=3)
    course_39 = models.CharField('Module 39', max_length=10, blank=True, null=True)
    weight_39 = models.DecimalField('Weight 39', blank=True, null=True, max_digits=4, decimal_places=3)
    course_40 = models.CharField('Module 40', max_length=10, blank=True, null=True)
    weight_40 = models.DecimalField('Weight 40', blank=True, null=True, max_digits=4, decimal_places=3)

    def get_courses(self):
        return [
            self.course_1, self.course_2, self.course_3, self.course_4, self.course_5,
            self.course_6, self.course_7, self.course_8, self.course_9, self.course_10,
            self.course_11, self.course_12, self.course_13, self.course_14, self.course_15,
            self.course_16, self.course_17, self.course_18, self.course_19, self.course_20,
            self.course_21, self.course_22, self.course_23, self.course_24, self.course_25,
            self.course_26, self.course_27, self.course_28, self.course_29, self.course_30,
            self.course_31, self.course_32, self.course_33, self.course_34, self.course_35,
            self.course_36, self.course_37, self.course_38, self.course_39, self.course_40,
        ]

    def get_weights(self):
        return [
            self.weight_1, self.weight_2, self.weight_3, self.weight_4, self.weight_5,
            self.weight_6, self.weight_7, self.weight_8, self.weight_9, self.weight_10,
            self.weight_11, self.weight_12, self.weight_13, self.weight_14, self.weight_15,
            self.weight_16, self.weight_17, self.weight_18, self.weight_19, self.weight_20,
            self.weight_21, self.weight_22, self.weight_23, self.weight_24, self.weight_25,
            self.weight_26, self.weight_27, self.weight_28, self.weight_29, self.weight_30,
            self.weight_31, self.weight_32, self.weight_33, self.weight_34, self.weight_35,
            self.weight_36, self.weight_37, self.weight_38, self.weight_39, self.weight_40,
        ]

    def _calculate_total_weight(self):
        return sum(round(w, 3) if w is not None else 0 for w in self.get_weights())

    def _weight_in_correct_range(self):
        return True if 0.999 <= self._calculate_total_weight() <= 1 else False

    def clean(self):
        if not self._weight_in_correct_range():
            total = self._calculate_total_weight()
            raise ValidationError("Weights summed to " + str(total) + ". Total weight should be 1.0 (or 0.999).")

    def save(self, *args, **kwargs):
        if self._weight_in_correct_range():
            super(AcademicPlan, self).save(*args, **kwargs)

    def __str__(self):
        return self.planCode


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

    def save(self, *args, **kwargs):
        self.matricNo.set_grade_data_updated()
        super(Grade, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.matricNo.set_grade_data_updated()
        super(Grade, self).delete(*args, **kwargs)
