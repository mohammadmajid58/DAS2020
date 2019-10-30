from django.db import models

class Grade(models.Model):

    course_code = models.Charfield('Course Code', max_length=30)
    student = models.Charfield('Student', max_length=7)
    alphanum = models.CharField('Alphanumeric Grade', max_length=2)
    class Meta:
        unique_together(('course_code', 'student'))

