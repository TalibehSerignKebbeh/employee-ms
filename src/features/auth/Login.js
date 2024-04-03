import React, {  useState } from 'react';
import  Lock  from '@mui/icons-material/Lock'
import  AccountBox  from '@mui/icons-material/AccountBox'
import  CircularProgress  from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useLoginMutation } from './authApiSlice';
import './login.css'
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useNavigate } from 'react-router-dom';
import UsePersist from '../../hooks/usePersist';
import {useTheme} from '@mui/material';
import { tokens } from '../../theme'

const Login = () => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const isDark = theme.palette.mode === 'dark';

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [persist, setpersist] = UsePersist()
    const [error, seterror] = useState('');
    const [values, setvalues] = useState({
        username: '', password: ''
    });
    const changePersist = (e) => {setpersist(prev=>!prev)}
    const [login, {isLoading, }] = useLoginMutation()
    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            const { accessToken, profile } = await login(values).unwrap()
            dispatch(setCredentials({  accessToken, profile }))
            setvalues({ username: '', password: '' })
            // if(['admin','ceo'].some(role=> employee?.roles?.incudes(role))){
                
            // }
            navigate('/dashboard')
        } catch (err) {
            console.log(err);
            // console.log(typeof err?.status);
            if (typeof err?.status !=='number') {
                seterror('No Server Response');
            } else if (err?.status === 400) {
                seterror(err?.data?.message);
            } else if (err?.status === 401) {
                seterror('Unauthorized');
            } else if (err?.status === 500) {
                seterror('Internal server error');
            }
            else {
                seterror(err?.data?.message);
            }
        }
       
        
    }
    const handlePasswordShow = (e) => {
            // console.log(e.target.value);
        const passwordField = document.getElementById('password')
        if (e.target.checked === true) {
        passwordField.type= 'text'
        } else {
        passwordField.type= 'password'       
    }
    }
    
    return (
        <div className='h-screen flex items-start sm:items-center justify-center
          mt-[100px] sm:mt-0'>
            <Box className={`${(isDark) ?
                "text-white bg-gray-800" :
                "text-gray-100 bg-white"} shadow-2xl`} border={'2'}
                minWidth={'360px'} maxWidth={'480px'} borderRadius='5px'
                
            color={colors.grey[100]}
                backgroundColor={colors.primary[400]}
                sx={{
                    width: {
                        xs: '100%', sm: '400px', md: '480px', lg: '480px',
                        px:'15px'
            }}}>
            
               <form className='login-form'
                onSubmit={submitLogin}
            >
                <h3 className="title"
                >Please! Login</h3>
                    {error ?
                        <p className='m-auto w-fit px-2 py-3 text-xs sm:text-lg md:text-xl bg-red-50 text-red-600 font-bold rounded-sm
                          mb-[40px]'>
                            {error}
                        </p> : null}
                    <Box className='p-0'  height={'60px'} margin='auto' mb="30px"
                    sx={{position:'relative',
                    width:{
                        xs:'95%', sm:'80%', md:'360px', lg:'360px'
                    }}} >
                    <AccountBox className='login-icon' id='account' />
                    <input className={`text-black text-base text-[24px]
                    border-2 border-stone-800 w-full h-full rounded-md pl-[2.1rem] m-auto`} type={'text'} id='username' value={values.username} onChange={(e) => setvalues({ ...values, username: e.target.value })}
                        placeholder="Username"
                    />
                </Box>
                    <Box className='p-0'  height={'60px'} margin='auto' mb="30px"
                    sx={{position:'relative',
                    width:{
                        xs:'95%', sm:'80%', md:'360px', lg:'360px'
                    }}}>
                    <Lock className='login-icon' />
                    <input className={`text-black text-base text-[24px]
                    border-2 border-stone-800 w-full h-full rounded-md pl-[2.1rem] m-auto`} type={'password'} value={values.password} onChange={(e) => setvalues({ ...values, password: e.target.value })}
                        placeholder="Password"
                        id='password'
                    />
                    <input type={'checkbox'} className="password-toggle" id='password-toggle'
                        onChange={handlePasswordShow} />
                </Box>
                <Box color={colors.grey[100]} className='persist-container'>
                    <label htmlFor='persist'>Trust this device</label>
                    <input type={'checkbox'} id="persist" className="persist-field"
                        // value={persist === true ? 'on' : 'off'}
                        checked={persist} defaultValue={persist}
                        onChange={changePersist}
                    /> 

                </Box>
                
                {isLoading ? <button type='' className='loading-btn'> <CircularProgress /> </button>
                    :
                    <button type='submit' className='submit-login'>Login</button>}
                {/* <Box color={colors.grey[100]} className='login-form-links'>
                    New here, Create an Account
                    <a href='/register'
                        className='signup-link'
                    >Sign up</a>
                </Box> */}
            </form>
        
            </Box>
        </div>
    );
}

export default Login;
