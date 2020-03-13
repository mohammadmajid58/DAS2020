from api.models.graduation_year import GraduationYear


def create_graduation_year():
    GraduationYear.objects.get_or_create(gradYear="19-20")
    GraduationYear.objects.get_or_create(gradYear="20-21")
    print("Graduation year created")
