import React from 'react';
import UseAuth from '../../hooks/UseAuth';
import { tokens } from '../../theme'
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import img from '../../data/noprofimage.jpeg'
import {profilePicture} from '../../features/auth/authSlice'
import { useSelector } from 'react-redux';

const SidebarProfile = () => {
    const profilePic = useSelector(profilePicture)
    const { username, status, } = UseAuth()

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
         <div className='w-full text-center '>
                    <img
                        src={profilePic || img} alt='profile'
                        className='h-20 w-20 mx-auto rounded-full '
                        />
                <Typography
                    sx={{
                        display:'inline',
                        color: colors.greenAccent[400],
                        fontSize: '1.4rem', margin: 'auto',
                    paddingY: 2, marginY: 1,mt:-2,
                        
                    }}>
                    {username}
                </Typography>
            {status ?
                <Typography sx={{
                px: '2px', py: '2px', minWidth: '60px',
                maxWidth:'90px',
                mx:'auto',borderRadius:'4px'
            }}
                className='bg-gradient-to-r from-green-400 via-green-600 to-green-400 font-medium'>
                {status}
            </Typography> : null}
            </div>
    );
}

export default SidebarProfile;
