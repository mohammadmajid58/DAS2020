import csv, string, random


"""Generate a random string of fixed length """	
def _random_string(string_length=6):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(string_length))


"""Generate a random student ID of fixed length """	
def _random_student_id():
    letters = string.digits
    return ''.join(random.choice(letters) for i in range(7))


## START OVERRIDE HERE
num_of_students = 5000

module_mark_file_names = ["Grade roster CHEM_3009_2019","Grade roster CHEM_3012_2019","Grade roster CHEM_3014_2019",
                            "Grade roster CHEM_4001_2019","Grade roster CHEM_4003P_2019",
                            "Grade roster CHEM_4009_2019","Grade roster CHEM_4012_2019","Grade roster CHEM_4014_2019"]
module_mark_column_names = ["EMPLID", "Name", "Grade"]

roster_file_name = "Roster"
roster_mark_column_names = ["EMPLID", "Name", "AcademicPlan", "Grad Year"]

grades = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "C1", "C2", "C3", "D1", "D2", "D3"]
gradYears = ["19-20", "20-21"]
academic_plans = ["F100-2208"]

## END OVERIRDE HERE

module_mark_lines = []
roster_lines = []

for i in range(num_of_students):
    student_id = _random_student_id()
    name = _random_string(string_length=5) + "," + _random_string(string_length=5)
    grad_year = random.choice(gradYears)
    academic_plan = random.choice(academic_plans)
    roster_lines.append([student_id, name, academic_plan, grad_year])
    module_mark_lines.append([student_id, name, random.choice(grades)])

with open(roster_file_name + '.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(roster_mark_column_names)
    for line in roster_lines:
    	writer.writerow(line)

for module_name in module_mark_file_names:
    with open(module_name + '.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(module_mark_column_names)
        lines = module_mark_lines
        writer.writerows(lines)
    