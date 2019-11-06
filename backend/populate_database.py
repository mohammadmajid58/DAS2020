import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from population_scripts.admin_user import create_admin_user

create_admin_user()
