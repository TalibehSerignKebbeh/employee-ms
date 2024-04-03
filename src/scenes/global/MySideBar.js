import React from 'react'
import HomeOutlined from '@mui/icons-material/HomeOutlined'
import Person3Outlined from '@mui/icons-material/Person3Outlined'
import {   useTheme } from '@mui/material/styles'
import Box  from '@mui/material/Box'
import CircularProgress  from '@mui/material/CircularProgress'
import Typography  from '@mui/material/Typography'
import { GiLevelThreeAdvanced } from 'react-icons/gi'
import { RiTodoLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import './sidebar.css'
import { usePostLogoutMutation } from '../../features/auth/authApiSlice'
import { AiOutlineProfile, AiOutlineLogout } from 'react-icons/ai'
import UseAuth from '../../hooks/UseAuth'
import SidebarProfile from '../../components/NavComponents/SidebarProfile'
import NavItem from '../../components/NavComponents/NavItem'
import  Tooltip  from '@mui/material/Tooltip'


export default function MySideBar({ selected, setSelected,
activeMenu, setactiveMeu}) {
    const navigate = useNavigate()
    const { token, roles } = UseAuth()
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark';
    const [Logout, { isLoading: loggingOut }] = usePostLogoutMutation()

    const LogoutFunction = async () => {
        await Logout().unwrap()
            .then(res => {
                console.log(res);
                navigate('/')
            }).catch(err => {
                console.log(err);
            })
    }
    if (!token)
        return null

    return (
        <Box className={`${(isDark) ? "text-gray-50 bg-gray-800" :
            "text-gray-100 bg-white"} shadow-2xl text-xl
            sidebar-wrapper relative h-screen overflow-y-auto`}
            sx={{
                overflow: 'auto',
                width: '250px',
                overflowX:'hidden',
                ml: activeMenu ? '0px' : '-250px',
                transition: 'margin-left 0.2s ease-in-out',
            }}
            minHeight="100vh" zIndex={10}
        >
            
                <Typography
                    sx={{
                        color: '#6E88D4',
                        textAlign:'center',
                        padding: '4px',my:'auto',mb:'-10px',
                        fontSize: '1.1rem', mx: 'auto',
                    }}>Dashboard Navigation
                </Typography>
          
            <hr className={`${isDark? 'bg-slate-200':'bg-slate-800'}`}/>
            {/* sub profile container */}
            <SidebarProfile />
            <hr className={`${isDark? 'bg-slate-200':'bg-slate-800'}`}/>
            <Box 
                sx={{
                    display: 'flex', flexDirection: 'column',
                }}
            >
                {/* links container */}
                <Box
                 >
                    <NavItem icon={<HomeOutlined />} to='/dashboard'
                        title={'dashboard'} selected={selected} setSelected={setSelected} 
                    />

                    {['admin','ceo', 'manager']?.some(role => roles?.includes(role))
                        ? <NavItem icon={<Person3Outlined />} to='dashboard/employees'
                        title={'employees'} selected={selected} setSelected={setSelected} 
                    /> :null}
                    <NavItem icon={<GiLevelThreeAdvanced />}
                        to='dashboard/leaves' title={'leaves'}
                        selected={selected} setSelected={setSelected} 
                    />
                     <NavItem icon={<RiTodoLine />} to='dashboard/todo' 
                    title={'todos'} selected={selected} setSelected={setSelected} 
                    />
                      <NavItem icon={<AiOutlineProfile />} to='dashboard/profile'
                        title={'profile'} selected={selected} setSelected={setSelected} 
                    />
                </Box>
                
              
                <Tooltip title="Logout">
                    <Box component={'button'} 
                        onClick={LogoutFunction}
                        sx={{ p:1,borderRadius:'14px',
                            mt: 3, mx: 'auto',height:'auto',cursor:'pointer',
                            bgcolor: isDark ? '#3335' : 'whitesmoke', width: 'auto',
                        }}
                    >
                        {loggingOut ? <CircularProgress className='' /> :
                            <AiOutlineLogout
                                className={`${(isDark) ? "icon-logout" : "icon-logout-white"} `} 
                            />
                        }
                    </Box>
                </Tooltip>


            </Box>
        </Box>
    )
}


