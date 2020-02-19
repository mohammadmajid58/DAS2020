from django.contrib.auth.models import User


def create_admin_user():
    user = User.objects.get_or_create(username="admin", email="mihneamaldaianu7@gmail.com")[0]
    user.is_staff = True
    user.is_superuser = True
    user.save()

    user.set_password("123")
    user.save()

    print("Admin user account created")
