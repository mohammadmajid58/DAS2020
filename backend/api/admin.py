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
                    'course_14', 'weight_14', 'course_15', 'weight_15', 'course_16', 'weight_16',
                    'course_17', 'weight_17', 'course_18', 'weight_18', 'course_19', 'weight_19',
                    'course_20', 'weight_20', 'course_21', 'weight_21', 'course_22', 'weight_22',
                    'course_23', 'weight_23', 'course_24', 'weight_24', 'course_25', 'weight_25',
                    'course_26', 'weight_26', 'course_27', 'weight_27', 'course_28', 'weight_28',
                    'course_29', 'weight_29', 'course_30', 'weight_30', 'course_31', 'weight_31',
                    'course_32', 'weight_32', 'course_33', 'weight_33', 'course_34', 'weight_34',
                    'course_35', 'weight_35', 'course_36', 'weight_36', 'course_37', 'weight_37',
                    'course_38', 'weight_38', 'course_39', 'weight_39', 'course_40', 'weight_40')
