import { Box } from '@mui/material';
import React from 'react';
import { Header } from '../../components/other';

const SampleDashboard = () => {
    return (
        <Box>
            <Box m='20px' display={'flex'} justifyContent="space-between" alignItems={'center'}>

            <Header title={"DASHBOARD"} subTitle="Welcome to your dashboard"/>
            </Box>
        </Box>
    );
}

export default SampleDashboard;
