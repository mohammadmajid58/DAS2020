from django.core.exceptions import ValidationError
from django.db import models
from api.models import Student
from api.grade_converter import convert_a


class Grade(models.Model):
    courseCode = models.CharField('Course Code', max_length=30)
    matricNo = models.ForeignKey(Student, on_delete=models.CASCADE, db_column='matricNo')
    alphanum = models.CharField('Alphanumeric Grade', max_length=2, choices=[("A1", "A1"), ("A2", "A2"),
                                                                             ("A3", "A3"), ("A4", "A4"), ("A5", "A5"),
                                                                             ("B1", "B1"), ("B2", "B2"), ("B3", "B3"),
                                                                             ("C1", "C1"), ("C2", "C2"), ("C3", "C3"),
                                                                             ("D1", "D1"), ("D2", "D2"), ("D3", "D3"),
                                                                             ("E1", "E1"), ("E2", "E2"), ("E3", "E3"),
                                                                             ("F1", "F1"), ("F2", "F2"), ("F3", "F3"),
                                                                             ("G1", "G1"), ("G2", "G2"), ("H", "H"),
                                                                             ("CW", "CW"), ("CR", "CR"), ("MV", "MV")])

    class Meta:
        constraints = [models.UniqueConstraint(fields=['courseCode', 'matricNo'], name='composite_key')]
        verbose_name_plural = "Grades"
        app_label = 'api'

    def get_alphanum_as_num(self):
        return convert_a(self.alphanum)

    def is_grade_a_special_code(self):
        return self.alphanum in ["MV", "CW", "CR"]

    def course_does_not_exist(self):
        plan = self.matricNo.academicPlan
        return self.courseCode not in plan.get_courses()

    def clean(self):
        if self.course_does_not_exist():
            raise ValidationError("Course code does not exist in student's academic plan.")

    def save(self, *args, **kwargs):
        if self.course_does_not_exist():
            raise ValidationError("Course code does not exist in student's academic plan.")
        else:
            self.matricNo.set_grade_data_updated()
            super(Grade, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.matricNo.set_grade_data_updated()
        super(Grade, self).delete(*args, **kwargs)

    def __str__(self):
        return self.matricNo.matricNo + " : " + self.courseCode + " " + self.alphanum
