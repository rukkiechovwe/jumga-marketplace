export default function validateForm(field) {
    const formName = field.name
    switch (formName) {
        case "fullname":
            const regexName = /^[a-zA-Z]+ [a-zA-Z] +$/
            return regexName.test(field.value);
        case "email":
            const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
            // this regex would test if the email is valid
            return regexEmail.test(field.value); // it would return true if the email passes the regex testand false otherwise
        case "password":
            if (field.value.length > 5) return true;
            return false // just a basic password validation

        default:
            break;
    }
}
