from decimal import Decimal
from api.models.graduation_year import GraduationYear
from django.core.exceptions import ValidationError
from django.core.validators import MinLengthValidator
from django.db import models
from api.models import AcademicPlan


class Student(models.Model):
    matricNo = models.CharField('Student', max_length=7, validators=[MinLengthValidator(7)], primary_key=True)
    givenNames = models.CharField('Given name(s)', max_length=64)
    surname = models.CharField('Last name', max_length=32)
    academicPlan = models.ForeignKey(AcademicPlan, on_delete=models.CASCADE, null=False)
    gradYear = models.ForeignKey(GraduationYear, on_delete=models.CASCADE, db_column='gradYear')
    finalAward1 = models.DecimalField(max_digits=3, decimal_places=1, null=True)
    finalAward2 = models.DecimalField(max_digits=4, decimal_places=2, null=True)
    finalAward3 = models.DecimalField(max_digits=5, decimal_places=3, null=True, default=0.000)
    gradeDataUpdated = models.BooleanField(default=False)
    updatedAward = models.CharField("Updated Award", blank=True, default="-1", max_length=5)
    hasSpecialCode = models.BooleanField(default=False)
    isMissingGrades = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Students"
        app_label = 'api'

    def save(self, *args, **kwargs):
        if self.finalAward3:
            self.finalAward1 = Decimal(round(self.finalAward3, 1))
            self.finalAward2 = Decimal(round(self.finalAward3, 2))
            self.finalAward3 = Decimal(round(self.finalAward3, 3))
        try:
            int(self.matricNo)
            super().save(*args, **kwargs)
        except ValueError:
            raise ValidationError("Student matric no must be a number.")

    def set_grade_data_updated(self):
        self.gradeDataUpdated = True
        self.save()

    def set_has_special_code(self, value):
        self.hasSpecialCode = value
        self.save()

    def set_is_missing_grades(self, value):
        self.isMissingGrades = value

    def unset_grade_data_updated(self):
        self.gradeDataUpdated = False
        self.save()

    def __str__(self):
        return "{0} ({1}, {2})".format(self.matricNo, self.surname, self.givenNames)
