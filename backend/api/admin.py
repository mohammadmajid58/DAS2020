from django.contrib.admin import ModelAdmin, register
from api.models import Grade, Student, AcademicPlan


@register(Grade)
class GradeAdmin(ModelAdmin):
    icon_name = 'grade'
    list_display = ('matricNo', 'courseCode', 'alphanum')


@register(Student)
class StudentAdmin(ModelAdmin):
    icon_name = 'school'
    model = Student
    list_display = ('matricNo', 'givenNames', 'surname', 'academicPlan', 'finalAward')


@register(AcademicPlan)
class AcademicPlanAdmin(ModelAdmin):
    icon_name = 'event'
    model = AcademicPlan
    list_display = ('planCode', 'courseCode', 'mcName', 'mcCode',
                    'course_1', 'weight_1', 'course_2', 'weight_2', 'course_3', 'weight_3',
                    'course_4', 'weight_4', 'course_5', 'weight_5',
                    'course_6', 'weight_6', 'course_7', 'weight_7', 'course_8', 'weight_8',
                    'course_9', 'weight_9', 'course_10', 'weight_10',
                    'course_11', 'weight_11', 'course_12', 'weight_12', 'course_13', 'weight_13',
                    'course_14', 'weight_14', 'course_15', 'weight_15')
