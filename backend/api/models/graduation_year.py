from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.db import models

grad_year_validator_format = RegexValidator("^[0-9]{2}-[0-9]{2}$", "Invalid Format for Grad Year (YY-YY)",
                                            code="gradYear")


def grad_year_validator(year):
    message = "Second Year Must be Sequential From the First (i.e 19-20 or 21-22)"
    grad_year_validator_format(year)
    years = year.split("-")
    year1 = years[0]
    year2 = years[1]
    if int(year2) != ((int(year1) + 1) % 100):
        raise ValidationError(message=message, code="gradYear")


class GraduationYear(models.Model):
    gradYear = models.CharField('Graduation Year', max_length=5, primary_key=True, validators=[grad_year_validator])

    class Meta:
        verbose_name_plural = "Graduation Years"
        app_label = 'api'

    def __str__(self):
        return self.gradYear
