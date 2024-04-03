import { Box, Typography, } from '@mui/material'
import React from 'react'
// import { tokens } from '../../theme'
const Header = ({ title, subTitle }) => {
  // const colors = tokens(useTheme().palette.mode)
  return (
    <Box mb={'30px'}>
      <Typography variant='h2' color={'gray'}
        sx={{mb: '5px', fontWeight: 'bold'}}
      >{title}</Typography>
      <Typography variant='h5' color={'lightgreen'}
      >{subTitle}</Typography>
    </Box>
  )
}

export default Header
