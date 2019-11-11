from django.db import models


class Grade(models.Model):
    courseCode = models.CharField('Course Code', max_length=30)
    student = models.CharField('Student', max_length=7)
    alphanum = models.CharField('Alphanumeric Grade', max_length=2)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['courseCode', 'student'], name='composite_key')]
