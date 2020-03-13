from api.models import AcademicPlan, GraduationYear


def create_academic_plans():
    grad_year = GraduationYear.objects.get(gradYear="19-20")
    AcademicPlan.objects.get_or_create(gradYear=grad_year,
                                       planCode="F100-2208",
                                       courseCode="CHEM-4H",
                                       mcName="Chemistry, BSc",
                                       course_1="CHEM_3012", weight_1=0.083,
                                       course_2="CHEM_3009", weight_2=0.083,
                                       course_3="CHEM_3014", weight_3=0.083,
                                       course_4="CHEM_4003P", weight_4=0.25,
                                       course_5="CHEM_4014", weight_5=0.125,
                                       course_6="CHEM_4012", weight_6=0.125,
                                       course_7="CHEM_4009", weight_7=0.125,
                                       course_8="CHEM_4001", weight_8=0.125,
                                       )
    AcademicPlan.objects.get_or_create(gradYear=grad_year,
                                       planCode="F101-2207",
                                       courseCode="CHEM-5M",
                                       mcName="Chemistry with WP,MSci",
                                       course_1="CHEM_4012", weight_1=0.057,  # Org 3
                                       course_2="CHEM_4009", weight_2=0.057,  # Inorg 3
                                       course_3="CHEM_4014", weight_3=0.057,  # Phys 3
                                       course_4="CHEM_5016", weight_4=0.029,  # Front 3
                                       course_5="CHEM_4025", weight_5=0.200,  # Placement
                                       course_6="CHEM_5009P", weight_6=0.171,  # Project
                                       course_7="CHEM_5022", weight_7=0.086,  # Phys 4
                                       course_8="CHEM_5021", weight_8=0.086,  # Org 4
                                       course_9="CHEM_5017", weight_9=0.086,  # Inorg 4
                                       course_10="CHEM_5003", weight_10=0.086,  # ST
                                       course_11="CHEM_5005", weight_11=0.086,  # Prob
                                       )
    print("Academic plans created")
