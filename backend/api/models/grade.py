from django.db import models
from api.models import Student


class Grade(models.Model):
    courseCode = models.CharField('Course Code', max_length=30)
    matricNo = models.ForeignKey(Student, on_delete=models.CASCADE, db_column='matricNo')
    alphanum = models.CharField('Alphanumeric Grade', max_length=2)

    alpha_to_num = {"A1": 22, "A2": 21, "A3": 20, "A4": 19, "A5": 18, "B1": 17, "B2": 16, "B3": 15, "C1": 14,
                    "C2": 13, "C3": 12, "D1": 11, "D2": 10, "D3": 9, "E1": 8, "E2": 7,
                    "E3": 6, "F1": 5, "F2": 4, "F3": 3, "G1": 2, "G2": 1, "H": 0}

    class Meta:
        constraints = [models.UniqueConstraint(fields=['courseCode', 'matricNo'], name='composite_key')]
        verbose_name_plural = "Grades"
        app_label = 'api'

    def get_alphanum_as_num(self):
        return self.alpha_to_num[self.alphanum]

    def save(self, *args, **kwargs):
        self.matricNo.set_grade_data_updated()
        super(Grade, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.matricNo.set_grade_data_updated()
        super(Grade, self).delete(*args, **kwargs)
