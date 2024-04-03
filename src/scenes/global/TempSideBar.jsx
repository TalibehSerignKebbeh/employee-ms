import { HomeOutlined, MenuOutlined, Person3Outlined, PersonAddOutlined, TimeToLeaveOutlined } from '@mui/icons-material'
import { Box, CircularProgress, IconButton, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { GiLevelThreeAdvanced } from 'react-icons/gi'
import { RiTodoLine } from 'react-icons/ri'
import {NavLink, useNavigate } from 'react-router-dom'
import { tokens } from '../../theme'
import './sidebar.css'
import { usePostLogoutMutation } from '../../features/auth/authApiSlice'
import { FiLogOut } from 'react-icons/fi'
import img from '../../data/noprofimage.jpeg'
import { MdNewLabel } from 'react-icons/md'
import { AiOutlineProfile, AiOutlineLogout } from 'react-icons/ai'
import UseAuth from '../../hooks/UseAuth'

const NavItem = ({ icon, title, to, selected, setSelected }) => {
    let navTitle = title;
    if (title.includes('-')) {
        navTitle = title.split('-')[0]
    }
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const dark = theme.palette.mode === 'dark'
    const isSelected = selected === title;
    return <NavLink to={to}
        className={` sidebar-link${selected === title ? '-active' : ""} 
         hover:rounded-r-3xl rounded-r-3xl ${(isSelected && dark) && 'bg-blue-500'} ${(isSelected && !dark) && 'bg-indigo-50 '} rounded-r-3xl`}
        onClick={() => setSelected(title)} >
        <IconButton className={`${(isSelected && dark) && 'text-white'} ${(isSelected && !dark) && 'text-blue-500 '} sidebar-icon`}>
            {icon}
        </IconButton>
        <Typography sx={{ paddingLeft: '7px', color: `${colors.grey[100]}` }} >
            {navTitle}
        </Typography>
    </NavLink>

}
export default function MySideBar({selected, setSelected}) {
    const navigate = useNavigate()
    const { user } = UseAuth()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const isDark = theme.palette.mode === 'dark';
    const [activeMenu, setactiveMeu] = useState(true);
    // setSelected("dashboard");
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
    if (!user)
        return null

    return (
        <Box className={`${(isDark) ? "text-gray-50 bg-gray-800" :
            "text-gray-100 bg-white"} shadow-2xl text-xl
            sidebar-wrapper relative`}
            sx={{
                transition: 'all 0.2s ease-in-out',
                overflow: 'auto',
                width:activeMenu? '220px':'0px'
            }}
            // width={(activeMenu) ? '210px' : ''}
            minHeight="100vh" zIndex={3}
        >
            <h3>Hello from</h3>
            <Box display={'flex'} justifyContent='space-between'
                alignItems={'center'} marginTop={'5px'}
            >
                {activeMenu ?
                    <>
                        <Typography sx={{ color: `{${(isDark)? "#fff":"black"}}`,
                            marginLeft: '4px', padding: '8px 14px', fontSize: '1.2rem',
                        }}>EMS</Typography>
                        <IconButton className={``} onClick={() => setactiveMeu(!activeMenu)}>
                            <MenuOutlined sx={{ scale: 3, width: '35px', height: '35px' }} />
                        </IconButton>
                    </>
                    :
                    <IconButton
                        
                        className={`${(activeMenu)? 'mr-0' :'-mr-50 '}  `}
                        sx={{
                            mr: `${(activeMenu) ? 'auto' : '-200px'}`,
                            marginLeft: 'auto',
                            position: `${(activeMenu) ? 'relative' : 'relative'}`, zIndex: 10,
                        }}
                        onClick={() => setactiveMeu(!activeMenu)}>
                        <MenuOutlined  sx={{ scale: 3, width: '35px', height: '35px' }} />
                    </IconButton>
                }
            </Box>
            <hr />
            <div className='sidebar-profile-wrapper'>
                <div className='profile-container'>
                    <img
                        src={user?.profile ? user?.profile : img} alt='profile' className='profile-img' width={(activeMenu) ? "40px" : '0'} height={(activeMenu) ? "40px" : '0'} />
                </div>
                <Typography
                    sx={{
                        display: (activeMenu) ? 'inline' : 'none', color: colors.greenAccent[400], fontSize: '1.4rem', margin: 'auto', paddingY: 2, marginY: 1
                    }}>
                    {user?.username}
                </Typography>
            </div>
            <hr />
            <Box display={'flex'} flexDirection="column" className='links-wrapper'
            >
                <Box marginRight={(activeMenu) ? '10px' : '200px'}
                    display={(!activeMenu) && "none"}
                >
                    <NavItem icon={<HomeOutlined />} to='/dashboard'
                        title={'dashboard'} selected={selected} setSelected={setSelected} 
                    />
                </Box>
                <Typography sx={{
                    display: (activeMenu) ? 'inline' : "none",
                    fontWeight: '200', fontSize: '.8rem', marginLeft: 2,
                    color: colors.grey[100], marginTop: 1, opacity: .8
                }}>
                    Employees
                </Typography>
                <Box display={(!activeMenu) && "none"}
                    marginLeft={(activeMenu) ? '6px' : '0'}
                    marginRight={(activeMenu) ? '10px' : '20px'}
                >
                    <NavItem icon={<Person3Outlined />} to='dashboard/employees'
                        title={'employees'} selected={selected} setSelected={setSelected} 
                    />
                    <NavItem icon={<PersonAddOutlined />}
                        to='dashboard/employees/new' title={'new-employees'}
                        selected={selected} setSelected={setSelected} 
                    />
                </Box>
                <Typography sx={{
                    display: (activeMenu) ? 'inline' : "none",
                    fontWeight: '200', fontSize: '.8rem', marginLeft: 2,
                    color: colors.grey[100], marginTop: 1, opacity: .8
                }}>
                    Leaves
                </Typography>
                <Box display={(!activeMenu) && "none"}
                    marginLeft={(activeMenu) ? '6px' : '0'}
                    marginRight={(activeMenu) ? '10px' : '20px'}
                >
                    <NavItem icon={<GiLevelThreeAdvanced />}
                        to='dashboard/leaves' title={'leaves'}
                        selected={selected} setSelected={setSelected} 
                     />
                    <NavItem icon={<TimeToLeaveOutlined />}
                        to='dashboard/leaves/new' title={'new-leaves'}
                        selected={selected} setSelected={setSelected} 
                    />
                </Box>
                <Typography sx={{
                    display: (activeMenu) ? 'inline' : "none",
                    fontWeight: '200', fontSize: '.8rem', marginLeft: 2,
                    color: colors.grey[100], marginTop: 1, opacity: .8
                }}>
                    Todos
                </Typography>
                <Box display={(!activeMenu) && "none"}
                    marginLeft={(activeMenu) ? '6px' : '0'}
                    marginRight={(activeMenu) ? '10px' : '20px'}
                >
                    <NavItem icon={<RiTodoLine />} to='dashboard/todo' 
                    title={'todos'} selected={selected} setSelected={setSelected} 
                    />
                    <NavItem icon={<MdNewLabel />} to='dashboard/todo/new' 
                    title={'new-todos'} selected={selected} setSelected={setSelected} 
                    />
                </Box>
                <Box display={(!activeMenu) && "none"}
                    marginLeft={(activeMenu) ? '6px' : '0'}
                    marginRight={(activeMenu) ? '10px' : '20px'}
                >
                    <NavItem icon={<AiOutlineProfile />} to='dashboard/profile'
                        title={'profile'} selected={selected} setSelected={setSelected} 
                    />
                </Box>

                <Box display={(!activeMenu) && "none"}
                    margin={'auto'} marginBottom="15px"
                >
                    <Box component={'button'} width={`${(activeMenu) ? 'auto' : '0'}`}
                        height="auto" cursor='pointer'
                        onClick={LogoutFunction}
                        sx={{mt:4}}
                    >
                        {loggingOut ? <CircularProgress className='' /> :
                            <AiOutlineLogout
                                className={`${(isDark) ? "icon-logout" : "icon-logout-white"} `} 
                            />
                        }
                    </Box>
                </Box>
                {/* <Link to={'/'} className='sidebar-link' >
                    <IconButton>
                        <HomeOutlined />
                    </IconButton>
                    <Typography sx={{ color: `${colors.grey[100]}` }} >Dashboard</Typography>
                </Link>
                <Link to={'users'} className='sidebar-link' >
                    <IconButton>
                        <Person2Outlined />
                    </IconButton>
                    <Typography sx={{ color: `${colors.grey[100]}` }} >Employees</Typography>
                </Link>
                <Link to={'users'} className='sidebar-link' >
                    <IconButton>
                        <Timer10SelectOutlined />
                    </IconButton>
                    <Typography sx={{ color: `${colors.grey[100]}` }} >Leave</Typography>
                </Link> */}
                {/*
                <Box component={'a'} display={'flex'} alignItems='center' width="auto" padding={'3px'}>
                    {activeMenu ?
                        <>
                            <IconButton>
                                <Person2Outlined />
                            </IconButton>
                            <Typography sx={{ textDecoration: 'none', color: `${colors.grey[100]}` }} >Employees</Typography>
                        </>
                        :
                        <IconButton>
                            <Person2Outlined />
                        </IconButton>
                    }
                </Box>
                <Box component={'a'} display={'flex'} alignItems='center' width="auto" padding={'3px'}>
                     {activeMenu ?
                        <>
                            <IconButton>
                                <TimeToLeaveOutlined />
                            </IconButton>
                            <Typography sx={{ textDecoration: 'none', color: `${colors.grey[100]}` }} >Leave</Typography>
                        </>
                        :
                        <IconButton>
                            <TimeToLeaveOutlined />
                        </IconButton>
                    }
                </Box> */}

            </Box>
        </Box>
    )
}


