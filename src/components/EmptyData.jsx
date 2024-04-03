import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { GiEmptyMetalBucket } from 'react-icons/gi';
import { tokens } from '../theme'


export default function EmptyData({ name }) {
    const colors = tokens(useTheme().palette.mode);
    const dark = useTheme().palette.mode === "dark"
    return (
        <>
            <Box margin='auto' marginTop={'40px'} width='300px' height="200px" display='flex' flexDirection='column'
               className={`${(dark)? "bg-gray-600": "bg-white"} shadow-lg`} borderRadius="5px" textAlign={'center'}
            >
                <GiEmptyMetalBucket className='emptyIcon' />
                <Typography sx={{ fontSize: '1.8rem', color: `${colors.greenAccent[100]}`, marginY: 2 }} >You have no {name} </Typography>
            </Box>
           
        </>
    )
}
