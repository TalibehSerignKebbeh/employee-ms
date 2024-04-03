import { Box } from '@mui/system';
import React, { useState } from 'react';
import './AddEmployeeForm.css'
import { useTheme, Button, CircularProgress, Typography, Alert } from '@mui/material';
import { tokens } from '../../theme';
import { apiInstance } from '../../api';
import UseAuth from '../../hooks/UseAuth';
import FileBase from 'react-file-base64'
import { UploadFileOutlined } from '@mui/icons-material';
// import base64 from 'react-file-base64'
// import { useAddEmployeeMutation } from '../../features/Employee/EmployeeApiSlice';

const AddEmployeeForm = () => {
    const {  token } = UseAuth()
    const [employee, setemployee] = useState({
        firstName: '', lastName: '', middleName: '', password: '', email: '', telephone: '', salary: 0, jobTitle: '',
        address: '', gender: '', roles: [], dob: '', username: '', profile: ''
    });
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const bgColor = tokens(theme.palette.background)
    const [isSubmitting, setisSubmitting] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const [progress, setprogress] = useState(null);
    const [imgSrc, setimgSrc] = useState(null);

    // const [AddEmployee, {isLoading, isError, isSuccess}] = useAddEmployeeMutation()
    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }
    const handleRolesChange = (e) => {
        const value = e.target.options[e.target.selectedIndex].value
        if (employee.roles.includes(value)) {
            if (employee?.roles.length === 1) {
                setemployee({ ...employee, roles: [] })
                return
            }
            const newRoles = employee.roles.filter(role => role !== value);
            setemployee({ ...employee, roles: newRoles })
        } else {
            setemployee({ ...employee, roles: [...employee.roles, value] })
        }
    }
    const handleProfileChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = x => {
            // setimage(e.target.files[0])
            console.log(file);
            setimgSrc(x.target.result)
            // x.target.result
        }
        reader.readAsDataURL(file)
        setemployee({ ...employee, profile: file })

    }
    const handleCreateEmployee = async (e) => {
        e.preventDefault();
        setisSubmitting(true)
        // console.log(employee);
        // const empData = getFormData(employee)
        await apiInstance(token).post("/employee", employee, {
            onUploadProgress: (data) => {
                setprogress(Math.floor((data.upload / data.total) * 100))
            }
        })
            .then(res => {
                console.log(res);
                setisSubmitting(false)
                setisSuccess(true)
            }).catch(err => {
                setisSubmitting(false)
                console.log(err)
            })
    }
    // const [page, setpage] = useState(0);
    // const formComponents = [
    //     <PersonalInfo employee={employee} setemployee={setemployee} page={page} setPage={setpage} />,
    //     <ContactInfor employee={employee} setemployee={setemployee} page={page} setPage={setpage} />
    // ]
    return (
        < form onSubmit={handleCreateEmployee} className="mt-3 w-auto xl:mx-3 lg:mx-2" encType='multipart/form-data'>
            {isSuccess ? <Alert closeText=''>Employee successfully added</Alert> : null}
            <Box className='xl:w-auto mx-auto my-auto xl:mx-4' display={'flex'} rowGap='7px' columnGap={'7px'} flexDirection="row" flexWrap={'wrap'} alignItems='center' justifyContent={'flex-start'}
                backgroundColor={bgColor} color={colors.grey[100]}>
                <Box width={'300px'} display='flex' flexDirection={'column'} fontSize='1rem' fontStyle={'italic'}>
                    <label htmlFor='firstname'>FirstName</label>
                    <input
                        className='text-black text-base border-2 border-stone-500 w-full h-10 rounded-md px-4 m-auto'
                        // className={theme.palette.mode === "dark" ? 'input-with-dark-bg' : 'input-with-light-bg'}
                        type={'text'} value={employee.firstName}
                        onChange={(e) => setemployee({ ...employee, firstName: e.target.value })}
                        id="firstname" placeholder='Eg. Modou'
                    />
                </Box>
                <Box width={'300px'} display='flex' flexDirection={'column'} fontSize='1rem' fontStyle={'italic'}>
                    <label htmlFor='mName'>MiddleName</label>
                    <input className='text-black text-base border-2 border-stone-500 w-full h-10 rounded-md px-4 m-auto' type={'text'} value={employee.middleName}
                        id="mName"
                        onChange={(e) => setemployee({ ...employee, middleName: e.target.value })} placeholder='Eg.'
                    />
                </Box>
                <Box width={'300px'} display='flex' flexDirection={'column'} fontSize='1rem' fontStyle={'italic'}>
                    <label htmlFor='lastName'>LastName</label>
                    <input className='text-black text-base border-2 border-stone-500 w-full h-10 rounded-md px-4 m-auto'
                        type={'text'} value={employee.lastName}
                        id="lastName"
                        onChange={(e) => setemployee({ ...employee, lastName: e.target.value })} placeholder='Eg.'
                    />
                </Box>
                <Box width={'300px'} display='flex' flexDirection={'column'} fontSize='1rem' fontStyle={'italic'}>
                    <label htmlFor='username'>Username</label>
                    <input
                        className='text-black text-base border-2 border-stone-500 w-full h-10 rounded-md px-4 m-auto' type={'text'}
                        value={employee.username}
                        id="username"
                        onChange={(e) => setemployee({ ...employee, username: e.target.value })} placeholder='Eg.'
                    />
                </Box>
                <Box width={'300px'} display='flex' flexDirection={'column'} fontSize='1rem' fontStyle={'italic'}>
                    <label htmlFor='address'>Address</label>
                    <input className='text-black text-base border-2 border-stone-500 w-full h-10 rounded-md px-4 m-auto' type={'tel'} value={employee.address} id="address"
                        onChange={(e) => setemployee({ ...employee, address: e.target.value })} placeholder='Eg.'
                    />
                </Box>
                <Box width={'300px'} display='flex' flexDirection={'column'} fontSize='1rem' fontStyle={'italic'}>
                    <label htmlFor='email'>Email</label>
                    <input className='text-black text-base border-2 border-stone-500 w-full h-10 rounded-md px-4 m-auto' type={'text'} value={employee.email} id="email"
                        onChange={(e) => setemployee({ ...employee, email: e.target.value })} placeholder='Eg.'
                    />
                </Box>
                <Box width={'300px'} display='flex' flexDirection={'column'} fontSize='1rem' fontStyle={'italic'}>
                    <label htmlFor='tel'>Telephone</label>
                    <input className='text-black text-base border-2 border-stone-500 w-full h-10 rounded-md px-4 m-auto' type={'text'} value={employee.telephone} id="tel"
                        onChange={(e) => setemployee({ ...employee, telephone: e.target.value })} placeholder='Eg.'
                    />
                </Box>
                <Box width={'300px'} display='flex' flexDirection={'column'} fontSize='1rem' fontStyle={'italic'}>
                    <label htmlFor='dob'>Date of birth</label>
                    <input className='text-black text-base border-2 border-stone-500 w-full h-10 rounded-md px-4 m-auto' type={'date'} value={employee.dob} id="dob"
                        onChange={(e) => setemployee({ ...employee, dob: e.target.value })} placeholder='Eg.'
                    />
                </Box>
                <Box width={'300px'} display='flex' flexDirection={'column'} fontSize='1rem' fontStyle={'italic'}>
                    <label htmlFor='jobtitle'>JobTitle</label>
                    <input className='text-black text-base border-2 border-stone-500 w-full h-10 rounded-md px-4 m-auto' type={'text'} value={employee.jobTitle} id="jobtitle"
                        onChange={(e) => setemployee({ ...employee, jobTitle: e.target.value })} placeholder='Eg.'
                    />
                </Box>
                <Box width={'300px'} display='flex' flexDirection={'column'} fontSize='1rem' fontStyle={'italic'}>
                    <label htmlFor='salary'>Salary</label>
                    <input className='text-black text-base border-2 border-stone-500 w-full h-10 rounded-md px-4 m-auto' type={'text'}
                        value={employee.salary === 0 ? '' : employee.salary}
                        onChange={(e) => setemployee({ ...employee, salary: e.target.value })}
                        id="salary" placeholder='Eg.'
                    />
                </Box>
                <Box width={'300px'} display='flex' flexDirection={'column'} fontSize='1rem' fontStyle={'italic'}>
                    <label htmlFor='gender'>Gender</label>
                    <select className={theme.palette.mode === "dark" ? 'select-with-dark-bg' : 'select-with-light-bg'}
                        id='gender-select'
                        value={employee.gender}
                        onChange={e => setemployee({ ...employee, gender: e.target.value })}
                    >
                        {!employee?.gender && <option value={''}>Choose gender</option>}
                        <option value={'male'}>male</option>
                        <option value={'female'}>female</option>
                        <option value={'other'}>other</option>
                    </select>

                </Box>
                <Box width={'300px'} display='flex' flexDirection={'column'} fontSize='1rem' fontStyle={'italic'}>
                    <label htmlFor='roles'>Roles</label>
                    <select className={theme.palette.mode === "dark" ? 'select-with-dark-bg' : 'select-with-light-bg'}
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
                </Box>
                <Box display={'flex'} flexDirection="column">
                    <label htmlFor='profile' className='text-white '>Profile</label>
                    <Box component={'label'} htmlFor='profile' borderRadius={'4px'} display={'inline-flex'} width="100px" height='65px'
                        backgroundColor={colors.grey[100]}
                        alignItems="center" justifyContent={'center'} id="profile-wrapper" sx={{cursor: 'pointer'}} >
                        <FileBase key={'profile'} type='file'  multiple={false} onDone={({ base64 }) => setemployee({ ...employee, profile: base64 })} />
                        <UploadFileOutlined
                            sx={{ margin: 'auto', marginRight: "33px", width: '35px', height: '35px', zIndex: 1, color: 'black' }}
                            id='upload-profile-icon' />
                    </Box>
                </Box>

                <Box>
                    <img style={{display: `${(employee.profile)? 'inline-block': 'none'}`}} src={employee?.profile} alt={''} width={'150px'} height="150px" />
                </Box>
            </Box>
            <Box position="relative" margin={'auto'} marginTop={'20px'} width="200px">
                <Button variant='contained' color='success'
                    onClick={handleCreateEmployee}
                    sx={{ width: '100%', height: '50px' }}
                >{isSubmitting ? <CircularProgress /> : 'Create'}</Button>
            </Box>

        </form>

    );
}

export default AddEmployeeForm;
