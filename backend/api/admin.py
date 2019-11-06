from django.contrib import admin
from api.models import Grade


class GradeAdmin(admin.ModelAdmin):
    list_display = ('student', 'course_code', 'alphanum')


admin.site.register(Grade, GradeAdmin)
