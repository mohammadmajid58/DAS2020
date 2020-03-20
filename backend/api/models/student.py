from decimal import Decimal
from api.models.graduation_year import GraduationYear
from django.core.exceptions import ValidationError
from django.core.validators import MinLengthValidator, RegexValidator
from django.db import models

IsNumericValidator = RegexValidator(r'^[0-9]*$',
                                    message='Student Matric No must be a Number',
                                    code='Invalid Matric No')


class Student(models.Model):
    matricNo = models.CharField('Matriculation number', max_length=7,
                                validators=[MinLengthValidator(7), IsNumericValidator],
                                primary_key=True,
                                help_text="Must be 7 digits and entirely numeric")
    givenNames = models.CharField('Given name(s)', max_length=64, help_text="Comma separated")
    surname = models.CharField('Surname', max_length=32)
    academicPlan = models.ForeignKey('AcademicPlan', on_delete=models.CASCADE, null=False, verbose_name="Academic plan")
    gradYear = models.ForeignKey(GraduationYear, on_delete=models.CASCADE, db_column='gradYear',
                                 verbose_name="Graduation year")
    finalAward1 = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True,
                                      verbose_name="Final award (1dp)")
    finalAward2 = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True,
                                      verbose_name="Final award (2dp)")
    finalAward3 = models.DecimalField(max_digits=5, decimal_places=3, null=True, default=0.000,
                                      verbose_name="Final award (3dp)",
                                      help_text="Updating this field automatically sets Final award (1dp) and Final "
                                                "award (2dp). This is done to prevent rounding errors.")
    gradeDataUpdated = models.BooleanField(default=False)
    updatedAward = models.CharField("Updated Award", blank=True, default="-1", max_length=5)
    hasSpecialCode = models.BooleanField(default=False, help_text="If this is checked, at least one grade for this "
                                                                  "student is of MV, CR or CW")
    isMissingGrades = models.BooleanField(default=True, help_text="If this is checked, at least one grade for this "
                                                                  "student is missing")

    class Meta:
        verbose_name_plural = "Students"
        app_label = 'api'

    def save(self, *args, **kwargs):
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

    def unset_grade_data_updated(self):
        self.gradeDataUpdated = False
        self.save()

    def set_has_special_code(self, value):
        self.hasSpecialCode = value
        self.save()

    def set_is_missing_grades(self, value):
        self.isMissingGrades = value

    def __str__(self):
        return "{0} ({1}, {2})".format(self.matricNo, self.surname, self.givenNames)
