import React from 'react';
import CircularProgress from "@mui/material/CircularProgress"
import { useTheme } from '@mui/material';

const Loaddder = () => {
    const theme = useTheme()
    const isDark = theme.palette.mode==='dark'
    return (
        <div className='loadder-wrapper w-full min-w-full min-h-full 
        h-full flex flex-col items-start justify-center'>
            <CircularProgress
                sx={{
                    transform: {
                        xl: 'scale(20)', lg: 'scale(16)', md: 'scale(14)', sm: 'scale(10)', xs: 'scale(6)'
                    },                     
                    // scale: {xl:16, lg:12,md:7, sm:5, xs:4},
                    m: 'auto',
                    color: isDark? '#fff' : '#333'
                }} />
        </div>
    );
}

export default Loaddder;
