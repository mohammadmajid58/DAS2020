from django.db import models


class GraduationYear(models.Model):
    gradYear = models.CharField('Graduation Year', max_length=5, primary_key=True)

    def __str__(self):
        return self.gradYear
