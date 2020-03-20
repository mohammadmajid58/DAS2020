export const getErrorReason = (error: any) => {
  const responseErrors = error.response.data;
  let errorOccurred = false;
  let errorMessage = "";
  let row = 0;

  for (var studentError of responseErrors) {
    row += 1;
    if ("matricNo" in studentError) {
      errorMessage =
        "It contains an invalid matriculation number. " +
        "The matriculation number is a required field, it must be entirely numeric with exactly 7 digits.";

      if (studentError.matricNo[0].includes("already exists")) {
        errorMessage =
          "It contains a student already that exists in the system.";
      }
      errorOccurred = true;
      break;
    }

    if ("givenNames" in studentError || "surname" in studentError) {
      errorMessage =
        "It contains an invalid student name. It is important that they are no spaces between the " +
        'matriculation number and student name, e.g. 1234567,"Bob, Billy",F123-456,19-20 is a valid row. ' + // eslint-disable-line quotes
        'The student name is required, it must be of the following format: "surname, givenNames".'; // eslint-disable-line quotes
      errorOccurred = true;
      break;
    }

    if ("academicPlan" in studentError) {
      errorMessage =
        "It contains a student on an academic plan that does not exist. " +
        "You must first create the academic plan on the admin site.";
      errorOccurred = true;
      break;
    }

    if ("gradYear" in studentError) {
      errorMessage =
        "It contains a student on a graduation year that does not exist. " +
        "You must first create the graduation year on the admin site.";
      errorOccurred = true;
      break;
    }

    if ("alphanum" in studentError) {
      errorMessage =
        "It contains an alphanumerical grade that is invalid. " +
        "Please see University guidelines for valid alphanumerical grades.";
      errorOccurred = true;
      break;
    }
  }

  if (errorOccurred) {
    return (
      errorMessage + " This error occurred on data row number " + row + "."
    );
  }
  return "";
};
