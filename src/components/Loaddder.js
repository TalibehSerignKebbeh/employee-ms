import React from 'react';
import CircularProgress from "@mui/material/CircularProgress"
import { useTheme } from '@mui/material';

const Loaddder = ({loadingText}) => {
    const theme = useTheme()
    const isDark = theme.palette.mode==='dark'
    return (
        <div className='w-full min-w-full min-h-full 
        h-full flex flex-col items-start pt-[200px] justify-center'>
            <p className='text-xl font-semibold text-sky-300 mx-auto'>
                {loadingText?.length? loadingText : 'Loading data'}
            </p>
            <CircularProgress 
                size={'6rem'}

                sx={{
                    m: 'auto',
                    color: isDark? '#fff' : '#333'
                }} />
        </div>
    );
}

export default Loaddder;
