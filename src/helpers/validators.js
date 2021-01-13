const regexName = /^[a-zA-Z]+ [a-zA-Z]+$/;
const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export function validateLoginForm(fields) {
  let errors = { atLeastAnError: false };
  if (!regexEmail.test(fields.email)) {
    errors.atLeastAnError = true;
    errors.email = "Invalid email address";
  }
  if (fields.password === undefined || fields.password.length < 6) {
    errors.atLeastAnError = true;
    errors.password =
      "Invalid password, Password should be greater than 5 characters";
  }
  return errors;
}

export function validateSignUpForm(fields) {
  let errors = { atLeastAnError: false };
  if (!regexName.test(fields.fullname)) {
    errors.atLeastAnError = true;
    errors.fullname = "Invalid name";
  }
  if (!regexEmail.test(fields.email)) {
    errors.atLeastAnError = true;
    errors.email = "Invalid email address";
  }
  if (fields.password === undefined || fields.password.length < 6) {
    errors.atLeastAnError = true;
    errors.password =
      "Invalid password, Password should be greater than 5 characters";
  }

  if (
    fields.confirmPassword === undefined ||
    fields.confirmPassword !== fields.password
  ) {
    errors.atLeastAnError = true;
    errors.confirmPassword = fields.confirmPassword
      ? "Password does not match"
      : "Invalid password, Password should be greater than 5 characters";
  }
  return errors;
}

// reset password
export function validateRPForm(fields) {
  let errors = { atLeastAnError: false };
  if (!regexEmail.test(fields.email)) {
    errors.atLeastAnError = true;
    errors.email = "Invalid email address";
  }

  return errors;
}
