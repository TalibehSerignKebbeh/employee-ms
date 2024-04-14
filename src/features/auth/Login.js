import React, { useRef, useState } from 'react';
import Lock from '@mui/icons-material/Lock'
import AccountBox from '@mui/icons-material/AccountBox'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useLoginMutation } from './authApiSlice';
import './login.css'
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useNavigate } from 'react-router-dom';
import UsePersist from '../../hooks/usePersist';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import LoginBanner from '../../data/product9.jpg'
import  gsap from 'gsap'
import {useGSAP} from '@gsap/react'

const Login = () => {

    const containerRef = useRef(null)
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
    const changePersist = (e) => { setpersist(prev => !prev) }
    const [login, { isLoading, }] = useLoginMutation()
    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            const { accessToken, profile } = await login(values).unwrap()
            dispatch(setCredentials({ accessToken, profile }))
            setvalues({ username: '', password: '' })
            // if(['admin','ceo'].some(role=> employee?.roles?.incudes(role))){

            // }
            navigate('/dashboard')
        } catch (err) {
            console.log(err);
            // console.log(typeof err?.status);
            if (typeof err?.status !== 'number') {
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
            passwordField.type = 'text'
        } else {
            passwordField.type = 'password'
        }
    }

    
    useGSAP(() => {
        gsap.fromTo('.box1', {
            y: -1000,
            scale: 0.3
        },{y:0, scale:1})
        gsap.fromTo('.box2', {
            y: -1000,scale:0.3
        },{y:0,scale:1})
    },{scope: containerRef.current})

    return (
        <div ref={containerRef} className='h-screen grid grid-rows-1 grid-cols-1 md:grid-cols-2 
        items-start sm:items-center justify-center
          p-5 sm:p-12 md:p-20 relative '
        >
            <div className={`box1 bg-cover bg-no-repeat bg-center
                 w-full h-full relative hidden md:flex flex-col items-center justify-center`}
                style={{
                    backgroundImage: `url(${LoginBanner})`
                }}
            >
                <p className='text-2xl first-letter:capitalize text-sky-600 font-bold'
                >
                    nice to see you again
                </p>
                <h2 className='text-3xl sm:text-4xl md:text-6xl uppercase font-bold
                  after:w-[90px] after:block after:bg-slate-50
                 after:h-2 after:rounded-lg 
                 after:left-auto after:right-auto after:text-center
                 after:mx-auto after:-mt-1'>welcome back</h2>
                {/* <img src={LoginBanner}
                    className='w-full h-full absolute -z-10'
                    alt=''
                /> */}
            </div>
            <Box className={`box2 ${(isDark) ?
                "text-white bg-gray-800" :
                "text-gray-100 bg-white shadow-gray-200"} shadow-2xl
                w-full h-fit md:h-full p-10 md:p-0
                flex items-center justify-center
                  `
            } border={'2'}
                // minWidth={'360px'} maxWidth={'480px'}
                borderRadius='5px'

                color={colors.grey[100]}
                backgroundColor={colors.primary[400]}
                sx={{
                }}
            >

                <form className='my-auto flex flex-col justify-center items-center
                 w-full min-w-full gap-10'
                    onSubmit={submitLogin}
                >
                    <h3 className="text-xl sm:text-3xl md:text-4xl text-blue-600
                          capitalize font-semibold"
                    >login now
                    </h3>
                    {error ?
                        <p className='m-auto w-fit px-2 py-3 text-sm sm:text-lg 
                        md:text-xl bg-red-50 text-red-600 font-bold rounded-sm
                           border-2 border-transparent '>
                            {error}
                        </p> :
                        null
                    }
                    <Box className='p-0  
                       w-full sm:w-11/12 md:w-10/12 max-w-[500px]   ' height={'60px'} margin='auto'
                        sx={{
                            position: 'relative',
                            // mb: { xs: '30px', sm: '30px', md: '40px', xl: '45px', xxl: '50px' },
                           
                        }} >
                        <AccountBox className='login-icon' id='account' />
                        <input className={`text-black text-base text-[24px]
                    border-2 border-stone-800 w-full h-full rounded-md pl-[2.1rem] m-auto`
                        }
                            type={'text'} id='username'
                            value={values.username}
                            onChange={(e) => setvalues({ ...values, username: e.target.value })}
                            placeholder="Username"
                        />
                    </Box>
                    <Box className='p-0  
                       w-full sm:w-11/12 md:w-10/12 max-w-[500px]   ' height={'60px'} margin='auto'
                        sx={{
                            position: 'relative',
                            // mb: { xs: '30px', sm: '30px', md: '40px', xl: '45px', xxl: '50px' },
                           
                        }}>
                        <Lock className='login-icon' />
                        <input className={`text-black text-base text-[24px]
                            border-2 border-stone-800 w-full h-full
                             rounded-md pl-[2.1rem] m-auto`
                        }
                            type={'password'} value={values.password}
                            onChange={(e) => setvalues({ ...values, password: e.target.value })}
                            placeholder="Password"
                            id='password'
                        />
                        <input type={'checkbox'} className="password-toggle" id='password-toggle'
                            onChange={handlePasswordShow} />
                    </Box>
                    <Box color={colors.grey[100]} className='flex flex-row flex-wrap items-center gap-2 mb-4 '>
                        <input type={'checkbox'} id="persist" className="persist-field"
                            // value={persist === true ? 'on' : 'off'}
                            checked={persist} defaultValue={persist}
                            onChange={changePersist}
                        />
                        <label className='text-xl font-light ' htmlFor='persist'>Trust this device</label>

                    </Box>

                    <button disabled={isLoading} type='submit'
                        className='p-3 w-[90%] sm:min-w-[300px] sm:max-w-lg bg-blue-400 rounded-md
                               text-xl sm:text-3xl text-white font-semibold '>
                        {isLoading ? <CircularProgress /> : 'Login'}
                    </button>

                </form>

            </Box>
        </div>
    );
}

export default Login;
