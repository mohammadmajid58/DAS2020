# Simple function to switch between alphanumeric and numerical grades

grade_codes = {"A1": 22, "A2": 21, "A3": 20, "A4": 19, "A5": 18, "B1": 17, "B2": 16, "B3": 15, "C1": 14, "C2": 13,
               "C3": 12, "D1": 11, "D2": 10, "D3": 9, "E1": 8, "E2": 7, "E3": 6, "F1": 5, "F2": 4, "F3": 3, "G1": 2,
               "G2": 1, "H": 0,
               "CW": 0,  # Credit withdrawn
               "CR": 0,  # Credit refused
               "MV": 0  # Medical void
               }

degree_classifications = ["Fail", "33", "0L", "0U", "01"]


def convert_a(n):
    if type(n) == str:
        return grade_codes.get(n, 0)

    elif type(n) == float:
        return [alpha for alpha, num in grade_codes.items() if num == n]


def convert_mc(n):
    n = float(n)
    if n >= grade_codes["A5"]:
        return "01"
    elif n >= grade_codes["B3"]:
        return "0U"
    elif n >= grade_codes["C3"]:
        return "0L"
    elif n >= grade_codes["D3"]:
        return "33"
    else:
        return "Fail"


def new_grade_in_higher_band(oldGrade, newGrade):
    oldMC = convert_mc(oldGrade)
    newMC = convert_mc(newGrade)

    return degree_classifications.index(newMC) > degree_classifications.index(oldMC)
