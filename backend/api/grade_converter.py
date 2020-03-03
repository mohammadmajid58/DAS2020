# Simple function to switch between alphanumeric and numerical grades

grade_codes = {"A1": 22, "A2": 21, "A3": 20, "A4": 19, "A5": 18, "B1": 17, "B2": 16, "B3": 15, "C1": 14, "C2": 13,
               "C3": 12, "D1": 11, "D2": 10, "D3": 9, "E1": 8, "E2": 7, "E3": 6, "F1": 5, "F2": 4, "F3": 3, "G1": 2,
               "G2": 1, "H": 0}


def convert_a(n):
    if type(n) == str:
        return grade_codes[n]

    elif type(n) == float:
        return [alpha for alpha, num in grade_codes.items() if num == n]


def convert_mc(n):
    n = float(n)
    if n > 17:
        return "01"
    elif n > 14:
        return "0U"
    elif n > 11:
        return "0L"
    elif n > 8:
        return "3"
    else:
        return "Fail"
