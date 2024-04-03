import * as yup from 'yup'


export const employeeAddShema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .min(4, 'Username must be at least 4 characters')
        .max(15, 'Username must not exceed 20 characters')
        .matches(/^[a-zA-Z0-9_-]+$/, 'Invalid characters in the username'),
    firstName: yup.string().required('Username is required').max(15, 'firstname must not exceed 15 characters'),
    lastName: yup.string().required('Username is required').max(15, 'firstname must not exceed 15 characters'),
    salary: yup.number().required('salary is required').lessThan(100000, 'salary must be lest than 100k')
        .moreThan(5000, 'salary must be more than 5k'),

    middleName: yup.string().max(15, "middleName cannot be more than 15 characters"),
    email: yup.string().required('email is required').email("invalid email address"),
    dob: yup.date().required('date of birth is required')
        .test('age', 'You must be at least 18 years old', (value) => {
            const today = new Date();
            const dob = new Date(value);
            const age = today.getFullYear() - dob.getFullYear();
            if (age < 18) {
                return false;
            }
            return true;
        }),
    password: yup
        .string()
        .required('Password is required')
        .min(5, "password must be more than 4 characters")
        .max(15, "password must not be more than 15 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!#@$&*?]).{5,}$/,
            'Password must contain at least one lowercase letter, one uppercase letter, and one of the following special characters: !#@$&*?'
        ),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    telephone: yup.string().required('Telephone is required').max(7, '"jobtitle cannot exceeds 7 characters length"'),
    address: yup.string().required('Address is required').max(15, "address cannot exceeds 20 characters length"),
    jobTitle: yup.string().required('Job Title is required').max(15, "jobtitle cannot exceeds 15 characters length"),
    gender: yup.string().required('gender is required')
});

export const profileSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .min(4, 'Username must be at least 4 characters')
        .max(15, 'Username must not exceed 20 characters')
        .matches(/^[a-zA-Z0-9_-]+$/, 'Invalid characters in the username'),
    firstName: yup.string().required('Username is required').max(15, 'firstname must not exceed 15 characters'),
    lastName: yup.string().required('Username is required').max(15, 'firstname must not exceed 15 characters'),

    middleName: yup.string().max(15, "middleName cannot be more than 15 characters"),
    email: yup.string().required('email is required').email("invalid email address"),
    dob: yup.date().required('date of birth is required')
        .test('age', 'You must be at least 18 years old', (value) => {
            const today = new Date();
            const dob = new Date(value);
            const age = today.getFullYear() - dob.getFullYear();
            if (age < 18) {
                return false;
            }
            return true;
        }),
  password: yup
    .string()
    .test('has-character', 'Password must contain at least one character', (value) => {
      // Check if the password contains at least one character
      return !value || value.trim().length > 0;
    })
    .test('password-validation', 'Invalid password', (value) => {
      // Apply password validation when the password is supplied
      return !value || value.trim().length === 0 || /^[a-zA-Z0-9!#@$&*?]{5,15}$/.test(value);
    }),

    confirm_password: yup
        .string().notRequired()
    ,
    telephone: yup.string().required('Telephone is required').max(7, '"jobtitle cannot exceeds 7 characters length"'),
    address: yup.string().required('Address is required').max(15, "address cannot exceeds 20 characters length"),
    gender: yup.string().required('gender is required')
});