import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import FileBase from 'react-file-base64'
import axios from 'axios'
import { Box } from '@mui/material';
import {useTheme} from '@mui/material';
import { tokens } from '../../theme';
// import { useAddEmployeeMutation } from '../../features/Employee/EmployeeApiSlice'


const PersonalInfo = ({ employee, setemployee, page, setPage }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const bgColor = tokens(theme.palette.background)
    const [isSubmitting, setisSubmitting] = useState(false);
    const [imageSrc, setimageSrc] = useState('');
    const [image, setimage] = useState(null);
    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }
    // const [AddEmployee, {isLoading, isSuccess, isError}] = useAddEmployeeMutation()
    const handleCreateEmployee = async (e) => {
        e.preventDefault();
        setisSubmitting(true)
        console.log(employee);
        const empData = getFormData(employee)
        await axios({
            url: 'http://localhost:4000/employee', data: empData,
            headers: { "Content-Type": "multipart/form-data", "accept": "text/plain" },
            method: "POST"
        })
            .then(res => {
                // alert(res?.data)
                console.log(res.data.message);
                setisSubmitting(false)
                // console.log("success");
            }).catch(err => {
                setisSubmitting(false)
                console.log(err)
            })
    }
    const handleProfileChange = (e) => {
        setemployee({ ...employee, profile: e.target.files[0] })
        const reader = new FileReader();
        reader.onload = x => {
            setimage(e.target.files[0])
            setimageSrc(x.target.result)
        }
    }
    const handleRolesChange = (e) => {
        const value = e.target.options[e.target.selectedIndex].value
        if (employee.roles.includes(value)) {
            if (employee?.roles.length === 1) {
                setemployee({ ...employee, roles: [] })
                
            }
            const newRoles = employee.roles.filter(role => role !== value);
            setemployee({ ...employee, roles: newRoles })
        } else {
            setemployee({ ...employee, roles: [...employee.roles, value] })
        }
    }
    return (
        <Box width={'100%'} backgroundColor={bgColor} color={colors.grey[100]}>
            <form onSubmit={handleCreateEmployee} className="employee-form" encType='multipart/form-data'>
                {/* <h3 className='add-form-title'>Employee Information</h3> */}
                <Box width='100%' height={'650px'} display="flex" flexWrap={'wrap'}
                    // className='input-container-wrapper'
                >
                    <div className='input-container'>
                        <label htmlFor='firstName'>FirstName</label>
                        <input style={{color: `${colors.grey[100]}`}} placeholder="eg. Modou" type={'text'} id="firstName" value={employee.firstName}
                            onChange={e => setemployee({ ...employee, firstName: e.target.value })}
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='middleName'>MiddleName</label>
                        <input style={{color: `${colors.grey[100]}`}} placeholder="eg. S" type={'text'} id="middleName" value={employee.middlename}
                            onChange={e => setemployee({ ...employee, middleName: e.target.value })}
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='lastName'>LastName</label>
                        <input style={{color: `${colors.grey[100]}`}} placeholder="eg. Mbye" type={'text'} id="lastName" value={employee.lastname}
                            onChange={e => setemployee({ ...employee, lastName: e.target.value })}
                        />
                    </div>

                    <div className='input-container'>
                        <label htmlFor='address'>address</label>
                        <input style={{color: `${colors.grey[100]}`}} placeholder="eg. Latrikunda Sabiji" type={'text'} id="address" value={employee.address}
                            onChange={e => setemployee({ ...employee, address: e.target.value })}
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='telephone'>Telephone</label>
                        <input style={{color: `${colors.grey[100]}`}} placeholder="eg. 7800221" type={'text'} id="telephone" value={employee.telephone}
                            onChange={e => setemployee({ ...employee, telephone: e.target.value })}
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='email'>email</label>
                        <input style={{color: `${colors.grey[100]}`}} placeholder="eg. myname@gmail.com" type={'email'} id="email" value={employee.email}
                            onChange={e => setemployee({ ...employee, email: e.target.value })}
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='username'>username</label>
                        <input style={{color: `${colors.grey[100]}`}} placeholder="eg. myusername" type={'text'} id="username" value={employee.username}
                            onChange={e => setemployee({ ...employee, username: e.target.value })}
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='password'>password</label>
                        <input style={{color: `${colors.grey[100]}`}} placeholder="eg. mypassword" type={'password'} id="password" value={employee.password}
                            onChange={e => setemployee({ ...employee, password: e.target.value })}
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='gender'>gender</label>
                        <select style={{color: `${colors.grey[100]}`}} id='gender-select'
                            value={employee.gender}
                            onChange={e => setemployee({ ...employee, gender: e.target.value })}
                        >
                            {!employee?.gender && <option value={''}>Choose gender</option>}
                            <option value={'male'}>male</option>
                            <option value={'female'}>female</option>
                            <option value={'other'}>other</option>
                        </select>

                    </div>
                    <div className='input-container'>
                        <label htmlFor='salary'>salary</label>
                        <input style={{color: `${colors.grey[100]}`}} placeholder="eg. 10000" type={'text'} id="salary" value={employee.salary === 0 ? '' : employee.salary}
                            onChange={e => setemployee({ ...employee, salary: e.target.value })}
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='salary'>Job Title</label>
                        <input style={{color: `${colors.grey[100]}`}} placeholder="eg. UI/UX Designer" type={'text'} id="jobTitle" value={employee.jobTitle}
                            onChange={e => setemployee({ ...employee, jobTitle: e.target.value })}
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='roles'>roles</label>
                        <select style={{color: `${colors.grey[100]}`}}
                            id='roles-select'
                            multiple
                            value={employee.roles}
                            onChange={handleRolesChange}
                        >
                            <option value={'employee'}>employee</option>
                            <option value={'admin'}>admin</option>
                            <option value={'manager'}>manager</option>
                            <option value={'secretary'}>secretary</option>
                            <option value={'CEO'}>CEO</option>
                        </select>
                    </div>
                    <div className='input-container ' id='profile-container'>
                        <label htmlFor='profile'>
                            <h3>Profile</h3>
                            {/* <span>+</span> */}
                        </label>
                        <input style={{color: `${colors.grey[100]}`}} type={'file'} onChange={handleProfileChange}
                            accept="image/.png image/.jpg image/.jpeg" hidden
                            name="profile"
                            id='profile'
                        />
                    </div>
                    {/* <div>
                        <img src={imageSrc} width={'150px'} height={'100px'} alt="profile " />
                    </div> */}
                </Box>
                <button type='submit' className={`submit-btn${isSubmitting ? "-submitting" : ""}`}>
                    {!isSubmitting ? 'Submit' : 'isSubmitting...'}
                </button>
                {/* <button disabled >Prev</button> */}
                {/* <button onClick={e => setPage(page + 1)} >Next</button> */}
            </form>
            {/* <FileBase type='file' id='profile' multiple={false}
                            onDone={({ base64 }) => setemployee({ ...employee, profile: base64 })} 
                            /> */}
        </Box>
    );
};


PersonalInfo.propTypes = {
    name: PropTypes.number
};


export default PersonalInfo;
