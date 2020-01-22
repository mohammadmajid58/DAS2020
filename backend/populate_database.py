import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from population_scripts.admin_user import create_admin_user
from population_scripts.academic_plan import create_academic_plan

create_admin_user()
create_academic_plan()
