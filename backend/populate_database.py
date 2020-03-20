# DEVELOPMENT SCRIPT ONLY!

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from population_scripts.graduation_year import create_graduation_year
from population_scripts.admin_user import create_admin_user
from population_scripts.academic_plan import create_academic_plans

create_graduation_year()
create_admin_user()
create_academic_plans()
