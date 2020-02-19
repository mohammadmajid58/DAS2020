from django.db import models
from api.models import Student
from api.grade_converter import convert_a


class Grade(models.Model):
    courseCode = models.CharField('Course Code', max_length=30)
    matricNo = models.ForeignKey(Student, on_delete=models.CASCADE, db_column='matricNo')
    alphanum = models.CharField('Alphanumeric Grade', max_length=2)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['courseCode', 'matricNo'], name='composite_key')]
        verbose_name_plural = "Grades"
        app_label = 'api'

    def get_alphanum_as_num(self):
        return convert_a(self.alphanum)

    def save(self, *args, **kwargs):
        self.matricNo.set_grade_data_updated()
        super(Grade, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.matricNo.set_grade_data_updated()
        super(Grade, self).delete(*args, **kwargs)
