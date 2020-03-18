from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from api.models.graduation_year import GraduationYear
from django.core.exceptions import ValidationError


class AcademicPlan(models.Model):
    gradYear = models.ForeignKey(GraduationYear, on_delete=models.CASCADE,
                                 db_column='gradYear', help_text='Select one of the existing graduation years',
                                 verbose_name='Graduation year')
    planCode = models.CharField('Academic plan code', max_length=9, primary_key=True,
                                help_text="The plan code that contains a letter and 3 numbers, e.g F100-2208")
    courseCode = models.CharField('Internal course code', max_length=15,
                                  help_text="The simple degree code used in Chemistry, e.g CHEM-4H")
    mcName = models.CharField('MyCampus description', max_length=35,
                              help_text="How MyCampus describes the plan code, e.g Chemistry. Bsc")
    course_1 = models.CharField(max_length=10, blank=True, null=True,
                                help_text="Enter the name each course name in the Course fields."
                                          " One course can't exist without its weight and vice versa")
    weight_1 = models.DecimalField(blank=True, null=True, max_digits=4,
                                   decimal_places=3, validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
                                   help_text="Enter the corresponding weight of the course with the same number."
                                             " Weight can only be between 0 and 1")

    class Meta:
        verbose_name_plural = "Academic Plans"
        app_label = 'api'
        constraints = [models.UniqueConstraint(fields=['gradYear', 'planCode'], name='composite_key')]

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

    def _has_duplicate_courses(self):
        courses = self.get_courses()
        clean_courses = []
        for course in courses:
            if course is not None:
                clean_courses.append(course)
        return len(clean_courses) != len(set(clean_courses))

    def _calculate_total_weight(self):
        self._check_corresponding_weights()
        return sum(round(w, 3) if w is not None else 0 for w in self.get_weights())

    def _weight_in_correct_range(self):
        return True if 0.99 <= self._calculate_total_weight() <= 1.01 else False

    def _number_of_weights(self):
        return sum(1 if weight is not None else 0 for weight in self.get_weights())

    def _has_weights(self):
        return self._number_of_weights() > 0

    def clean(self):
        show_error = True
        if self._has_duplicate_courses():
            raise ValidationError("There are multiple courses with the same Course name.")
        if not self._weight_in_correct_range():
            total = self._calculate_total_weight()
            weights = self.get_weights()
            for weight in weights:
                if weight is not None:
                    if weight < 0.0 or weight > 1.0:
                        show_error = False
            # if show_error is false, weight < 0 error from validator is shown
            # if there are no weights, we don't want to show an error
            if show_error and self._has_weights():
                raise ValidationError("Weights summed to " + str(total) + ". Total weight should be 1.0 (or 0.999).")

    def _check_corresponding_weights(self):
        for num in range(1, 41):
            course_i = 'course_%s' % num
            weight_i = 'weight_%s' % num
            if getattr(self, course_i) is not None and getattr(self, weight_i) is None:
                raise ValidationError("Course %s has no corresponding weight" % num)
            elif getattr(self, course_i) is None and getattr(self, weight_i) is not None:
                raise ValidationError("Weight %s has no corresponding course" % num)

    def save(self, *args, **kwargs):
        if self._weight_in_correct_range() or not self._has_weights():
            if not self._has_duplicate_courses():
                super(AcademicPlan, self).save(*args, **kwargs)

    def __str__(self):
        return self.planCode


for i in range(2, 41):
    AcademicPlan.add_to_class('course_%s' % i, models.CharField(max_length=10, blank=True, null=True))
    AcademicPlan.add_to_class('weight_%s' % i, models.DecimalField(blank=True, null=True,
                                                                   max_digits=4, decimal_places=3,
                                                                   validators=[MinValueValidator(0.0),
                                                                               MaxValueValidator(1.0)]))
