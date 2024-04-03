import React, { useState } from 'react';
import './leave.css'
import {    useTheme } from '@mui/material';
import  Box from '@mui/material/Box';
import  CircularProgress from '@mui/material/CircularProgress';
import  Typography from '@mui/material/Typography';

import { useGetEmployeesQuery } from '../../../features/Employee/EmployeeApiSlice';
import { useAddLeaveMutation } from '../../../features/Leaves/leaveApiSice';
import  Container  from '@mui/system/Container';
import { tokens } from '../../../theme';
import { roles } from '../../../config/Roles';
import UseAuth from '../../../hooks/UseAuth';
import Loaddder from '../../../components/Loaddder';
import { CloseOutlined } from '@mui/icons-material';


const Leave = () => {
    const { roles:UserRoles, username } = UseAuth()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const dark = theme.palette.mode === 'dark'
    // console.log(token);
    const isAdminOrManager = (UserRoles?.includes(roles.admin) || UserRoles?.includes(roles.manager));
    const [leave, setleave] = useState({
        category: '', createdDate: new Date().toUTCString(), beginDate: '', endDate: '', owner: username, createdBy: username,
    });
    const { data: employeeData, isLoading: loadingEmp, } = useGetEmployeesQuery()
    const [AddLeave, { isLoading: addingLeave, isError, error, reset,
        isSuccess, data
    }] = useAddLeaveMutation()
    const submitLeave = async (e) => {
        e.preventDefault();

        await AddLeave(leave).unwrap()
            .then(res => {
                console.log(data);

            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
            })
    }
       // const [users, setusers] = useState([]);
    return (
        <Container sx={{ color: `${colors.grey[100]}`, fontSize: '1.3rem' }}>
            {loadingEmp ? <Loaddder />
                :
                <Box className={`${(dark)? 'bg-gray-800 ' : 'bg-white '} shadow-md mt-4 rounded-lg md:w-96 w-72`}
                    margin={'auto'}  >
                    <Typography
                        className={`${(dark)? 'text-white' : 'text-slate-900'}`}
                        sx={{
                            paddingTop: 2, textAlign: 'center',my:2,
                            fontSize: '1.3rem', textTransform: 'uppercase'
                        }}>Book leave </Typography>
                    {isError ?
                        <div className='flex flex-row w-auto  justify-between
                        items-center bg-red-500 md:px-4 sm:px-2 px-1'>
                            <p className={`text-white  my-0 text-center text-xl`}>
                                {!error ? 'no server response' :
                                    (error?.status || error?.originalStatus) === 500 ?
                                        'internal server error'
                                    : error?.data?.message}
                            </p>
                            <button onClick={() => reset()} type=''
                                className='bg-transparent w-auto h-auto 
                            text-red-400  text-3xl bg-white
                             hover:bg-slate-50
                            p-[10px] rounded-full'>
                                <CloseOutlined />
                            </button>

                        </div> : null}
                    {isSuccess ?
                        <div className='flex flex-row w-auto  justify-between
                        items-center bg-green-600 md:px-4 sm:px-2 px-1'>
                            <p className={`text-white  my-0 text-center text-xl`}>
                                {data?.message}
                                </p>
                          <button onClick={() => reset()} type=''
                                className='bg-transparent w-auto h-auto 
                            text-red-400  text-3xl bg-white
                             hover:bg-slate-50
                            p-[10px] rounded-full'>
                                <CloseOutlined />
                            </button>

                        </div> : null}
                   
                    <form className={`  `} onSubmit={submitLeave}
                    >
                        <Box className='flex flex-col gap-1 gap-y-2'>
                             
                            <Box color={colors.grey[100]} display={'flex'} flexDirection='column' rowGap={'5px'}
                                className={`${(dark)} md:w-80 m-auto my-1 w-64`}>
                                <label className={`w-full text-left  italic 
                                ${(dark) ? 'text-white' : 'text-slate-900'}`} 
                                htmlFor='beginDate'>Start date
                                </label>
                                <input className={`w-full h-11 px-2 rounded 
                                border border-red-200 text-slate-700
                                text-sm`}
                                    type={'date'} value={leave.beginDate}
                                    onChange={e => setleave({ ...leave, beginDate: e.target.value })}
                                />
                            </Box>
                            <Box color={colors.grey[100]} display={'flex'} flexDirection='column'
                                className={`${(dark)} md:w-80 m-auto my-1 w-64`}>
                                <label className={`w-full text-left italic ${(dark)? 'text-white' : 'text-slate-900'}`} 
                                htmlFor='endDate'>End date
                                </label>
                                <input className={`w-full h-11 px-2 rounded border
                                 border-red-200 text-slate-700 text-sm`}
                                    type={'date'} value={leave.endDate}
                                    onChange={e => setleave({ ...leave, endDate: e.target.value })}
                                />
                            </Box>
                            <Box color={colors.grey[100]} display={'flex'}
                                flexDirection='column' className={`${(dark)} md:w-80 m-auto my-1 w-64`}>
                                <label className={`w-full text-left italic ${(dark)? 'text-white' : 'text-slate-700'}`} 
                                htmlFor='category'>Leave type
                                </label>
                                <select className={`w-full h-11 px-2 rounded border 
                                border-red-200 text-slate-600
                                text-sm`}
                                    value={leave.category}
                                    onChange={e => setleave({ ...leave, category: e.target.value })}
                                >
                                    {!leave?.category ?
                                        <option 
                                        className={`text-sm  ${(dark)? 'text-white bg-slate-400' : 'bg-white text-slate-700'}`}
                                            value={''}>
                                            Choose category</option>
                                        : null}
                                    <option 
                                    className={`text-sm  ${(dark)? 'text-white bg-slate-400':'bg-white text-slate-700' }`} 
                                    value={'parental'}>Parental Leave
                                    </option>
                                    <option 
                                    className={`text-sm  ${(dark)? 'text-white bg-slate-400':'bg-white text-slate-700' }`} 
                                    value={'marriage'}>Marriage Leave
                                    </option>
                                    <option 
                                    className={`text-sm  ${(dark)? 'text-white bg-slate-400':'bg-white text-slate-700' }`} 
                                    value={'annual'}>Annual Leave
                                    </option>
                                </select>

                            </Box>
                            {isAdminOrManager ?
                                <Box color={colors.grey[100]} display={'flex'}
                                    flexDirection='column' className={`${(dark)} md:w-80 m-auto my-1 w-64`}>
                                    <label className={`w-full text-left italic 
                                ${(dark)? 'text-white ' : ' text-slate-700'}`} 
                                htmlFor='User'>owner
                                </label>
                                    <select className={`w-full h-11 px-2 rounded 
                                    border border-red-200 text-slate-600
                                    text-sm`}
                                    value={leave.owner}
                                    onChange={e => setleave({ ...leave, owner: e.target.value })}
                                >
                                        {!leave?.owner ?
                                            <option 
                                            className={`text-sm  ${dark? 'text-white bg-slate-400':'bg-white text-slate-700' }`}
                                                value={''}>Owner</option> : null}
                                    {
                                        employeeData?.map(user => (
                                            <option 
                                            className={`text-sm  ${dark? 'text-white bg-slate-400':'bg-white text-slate-700' }`}
                                                key={user?._id} value={user?.username}>
                                                {user?.username}
                                            </option>
                                        ))
                                    }

                                </select>

                            </Box> : null}
                            
                            <button type='submit'
                                className='m-auto my-5 loading-btn'
                            disabled={addingLeave}>
                                
                                   {addingLeave? <CircularProgress /> : 'Submit'}
                                </button> 
                               
                            
                        </Box>
                    </form>

                </Box   >
            }
        </Container>
    );
}

export default Leave;
