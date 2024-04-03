import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup'
import { TextField, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { Header } from '../../components/other';

const initialValues = {
    firstName: '',
    lastName: '',
    address: '',
    middleName: '',
    email: '',
    telephone: '',
    gender: '',
    username: '',
    salary: '',
    roles: [],
    jobTitle: '',
    dob: '',
    password: ''
}

const AddForm = () => {
    const isNotMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = async (values) => {
        console.log(values);

    }
    const empSchema = yup.object().shape({
        firstName: yup.string().required("FirstName is required"),
        middleName: yup.string().notRequired(),
        lastName: yup.string().required("LastName is required"),
        email: yup.string().email("Invalid email").required("email is required"),
        address: yup.string().required("address is required"),
        telephone: yup.number("phone must be numbers").min(7,"telephone can't be less than 7 characters").max(12,"telephone can't be greater than 12 characters").required("Telephone is required"),
        gender: yup.string().required("gender is required"),
        username: yup.string().required("Username is required"),
        salary: yup.string().required("salary is required"),
        roles: yup.array().required("Roles is required"),
        jobTitle: yup.string().required("jobTitle is required"),
        dob: yup.date().required("Date of birth is required"),
        password: yup.string().required("Password is required"),
    })
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues, validationSchema: empSchema
    })


    return (
        <Box m="20px" width="100%" height={"100vh"} minHeight="100%">
            <Header title={'CREATE EMPLOYEE'} subTitle="Create a new employee profile" />
            <form onSubmit={handleSubmit} style={{
                minWidth: "100%", width: "auto", minHeight: "100%", height: "100%", display: 'grid',
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(70px)",
                gap: '10px', alignItems: 'center', alignContent: 'center',
                justifyContent: 'center',
            }}>
                <TextField fullWidth variant='filled' type="text"
                    onChange={handleChange} onBlur={handleBlur}
                    value={values.firstName} label="First Name"
                    name="firstName"
                    error={!!touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridArea: 'auto', }}
                />
                <TextField fullWidth variant='filled' type="text"
                    onChange={handleChange} onBlur={handleBlur}
                    value={values.lastName} label="Last Name"
                    name="lastName"
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridArea: 'auto', }}
                />
                <TextField fullWidth variant='filled' type="text"
                    onChange={handleChange} onBlur={handleBlur}
                    value={values.middleName} label="Middle Name"
                    name="middleName"
                    error={!!touched.middleName && !!errors.middleName}
                    helperText={touched.middleName && errors.middleName}
                    sx={{ gridArea: 'auto' }}
                />
                <TextField fullWidth variant='filled' type="text"
                    onChange={handleChange} onBlur={handleBlur}
                    value={values.telephone} label="Telephone"
                    name="telephone"
                    error={!!touched.telephone && !!errors.telephone}
                    helperText={touched.telephone && errors.telephone}
                />
                <TextField fullWidth variant='filled' type="text"
                    onChange={handleChange} onBlur={handleBlur}
                    value={values.email} label="Email"
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridArea: 'auto' }}
                />
{/* 

                <TextField fullWidth variant='fillled' type="text"
                    onChange={handleChange} onBlur={handleBlur}
                    value={values.address} label="Address"
                    name="address"
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                    sx={{ gridArea: 'auto' }}
                />
                <TextField fullWidth variant='fillled' type="text"
                    onChange={handleChange} onBlur={handleBlur}
                    value={values.jobTitle} label="JobTitle"
                    name="jobTitle"
                    error={!!touched.jobTitle && !!errors.jobTitle}
                    helperText={touched.jobTitle && errors.jobTitle}
                    sx={{ gridArea: 'auto' }}
                />


                <TextField fullWidth variant='fillled' type="number"
                    onChange={handleChange} onBlur={handleBlur}
                    value={values.salary} label="Salary"
                    name="salary"
                    error={!!touched.salary && !!errors.salary}
                    helperText={touched.salary && errors.salary}
                    sx={{ gridArea: 'auto' }}
                />
 */}
            </form>


        </Box>
    );
}

export default AddForm;
