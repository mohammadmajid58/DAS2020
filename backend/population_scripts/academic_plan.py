from api.models import AcademicPlan


def create_academic_plan():
    AcademicPlan.objects.get_or_create(planCode="F100-2208", courseCode="CHEM-4H",
                                       mcName="Chemistry, BSc", mcCode="2208",
                                       course_1="CHEM_3012", weight_1=0.083,
                                       course_2="CHEM_3009", weight_2=0.083,
                                       course_3="CHEM_3014", weight_3=0.083,
                                       course_4="CHEM_4003P", weight_4=0.25,
                                       course_5="CHEM_4014", weight_5=0.125,
                                       course_6="CHEM_4012", weight_6=0.125,
                                       course_7="CHEM_4009", weight_7=0.125,
                                       course_8="CHEM_4001", weight_8=0.125,
                                       )
    print("Academic plan created")
