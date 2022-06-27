import * as yup from "yup";

export const LoginFormValidation = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
});

export const RegistrationFormValidation = yup.object().shape({
    firstName: yup.string().matches(/^[aA-zZ\s]+$/, "Firstname can only contain letters").required("Username is required"),
    lastName: yup.string().matches(/^[aA-zZ\s]+$/, "Firstname can only contain letters").required("Username is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required").min(8, "You need at least 8 Characters").matches(/^(?=.*[0-9])/, 'Must contain at least one number'),
    email: yup.string().email().required(),
    confirmedPassword: yup.string().min(8, "You need at least 8 Characters").matches(/^(?=.*[0-9])/, 'Must contain at least one number').required("Password is required").oneOf([yup.ref('password'), null], 'Passwords must match')
});