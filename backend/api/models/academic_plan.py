from django.db import models
from django.core.exceptions import ValidationError


class AcademicPlan(models.Model):
    planCode = models.CharField('Academic Plan Code', max_length=9, unique=True, primary_key=True)
    courseCode = models.CharField('Internal Course Code', max_length=15)
    mcName = models.CharField('MyCampus Description', max_length=35)

    class Meta:
        verbose_name_plural = "Academic Plans"
        app_label = 'api'

    def get_courses(self):
        course_list = []
        for num in range(1, 41):
            course_name = 'course_%s' % num
            course_list.append(getattr(self, course_name))
        return course_list

    def get_weights(self):
        weight_list = []
        for num in range(1, 41):
            weight_name = 'weight_%s' % num
            weight_list.append(getattr(self, weight_name))
        return weight_list

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


for i in range(1, 41):
    AcademicPlan.add_to_class('course_%s' % i, models.CharField(max_length=10, blank=True, null=True))
    AcademicPlan.add_to_class('weight_%s' % i, models.DecimalField(blank=True, null=True,
                                                                   max_digits=4, decimal_places=3))
