const regexText = /^[a-zA-Z0-9 ]+$/;
const regexName = /^[a-zA-Z ]+$/;
const regexNumber = /^[0-9]+$/;
const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// BASIC FIELD VALIDATIONS
// TODO: More validation on card input fields

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
  if (!regexName.test(fields.fullname) || fields.fullname === undefined) {
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

export function validateAddressForm(fields) {
  let errors = { atLeastAnError: false };
  for (const key in fields) {
    if (key === "zipcode") {
      if (!regexNumber.test(fields[key])) {
        errors.atLeastAnError = true;
        errors[key] = "Invalid Zipcode";
      }
    }
    if (fields[key] === undefined || fields[key].length === 0) {
      errors.atLeastAnError = true;
      errors[key] = `${key} is required`;
    }
  }

  return errors;
}

export function validatePaymentForm(fields) {
  let errors = { atLeastAnError: false };
  if (
    !regexNumber.test(fields.card_number) ||
    fields.card_number.length === 0
  ) {
    errors.atLeastAnError = true;
    errors.card_number = "Invalid card number";
  }

  if (!regexName.test(fields.fullname) || fields.fullname === undefined) {
    errors.atLeastAnError = true;
    errors.fullname = "Invalid cardholder name";
  }
  if (
    !regexNumber.test(fields.cvv) ||
    fields.cvv === undefined ||
    fields.cvv.length > 4
  ) {
    errors.atLeastAnError = true;
    errors.cvv = "Invalid cvv number";
  }
  if (
    fields.expiry_date === undefined ||
    !regexNumber.test(fields.expiry_date.substring(0, 2)) ||
    !regexNumber.test(fields.expiry_date.substring(3)) ||
    fields.expiry_date.length !== 5
  ) {
    errors.atLeastAnError = true;
    errors.expiry_date = "Invalid expiry date";
  }
  return errors;
}

export function validateCreateShopForm(fields) {
  let errors = { atLeastAnError: false };
  if (!regexText.test(fields.title) || fields.title === undefined) {
    errors.atLeastAnError = true;
    errors.title =
      fields.title === undefined
        ? "Shop title is required"
        : "Invalid text format";
  }
  if (fields.description === undefined || fields.description.length === 0) {
    errors.atLeastAnError = true;
    errors.description =
      fields.title === undefined
        ? "Shop description is required"
        : "Invalid text format";
  }
  if (fields.featuredImage === undefined) {
    errors.atLeastAnError = true;
    errors.featuredImage = "Featured image is required";
  }
  return errors;
}

export function validateAddProductForm(fields) {
  let errors = { atLeastAnError: false };
  if (!regexText.test(fields.title) || fields.title === undefined) {
    errors.atLeastAnError = true;
    errors.title =
      fields.title === undefined
        ? "Product title is required"
        : "Invalid text format";
  }
  if (fields.description === undefined || fields.description.length === 0) {
    errors.atLeastAnError = true;
    errors.description =
      fields.title === undefined
        ? "Product description is required"
        : "Invalid text format";
  }
  if (fields.price === undefined || !regexNumber.test(fields.price)) {
    errors.atLeastAnError = true;
    errors.price =
      fields.price === undefined
        ? "Price is required"
        : "Invalid number format";
  }
  if (
    fields.quantityAvailable === undefined ||
    !regexNumber.test(fields.quantityAvailable)
  ) {
    errors.atLeastAnError = true;
    errors.quantityAvailable =
      fields.quantityAvailable === undefined
        ? "Quantity available is required"
        : "Invalid number format";
  }
  if (fields.productImage === undefined) {
    errors.atLeastAnError = true;
    errors.productImage = "Product image is required";
  }
  return errors;
}
