import React from 'react';
import Box from '@mui/material/Box'

const InputWrapper = ({children}) => {
    return (
        <Box className='xl:w-96 md:w-72 sm:w-52' display='flex' flexDirection={'column'}
            fontSize='1rem' fontStyle={'italic'}>
            {children}
        </Box>

    );
}

export default InputWrapper;
