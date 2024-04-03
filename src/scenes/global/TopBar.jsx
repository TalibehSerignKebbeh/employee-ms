import React from 'react'
import { Box, useTheme } from '@mui/system'
import IconButton from '@mui/material/IconButton'
import { useContext } from 'react'
import InputBase from '@mui/material/InputBase'
import { ColorModeContext, tokens } from '../../theme'
import { LightModeOutlined, DarkModeOutlined, NotificationsOutlined, SettingsOutlined, PersonOutline, Search } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { currentToken } from '../../features/auth/authSlice'
const TopBar = () => {
    const userToken = useSelector(currentToken)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    // if (!userToken)
    //     return(
    //     <Box width="100%" display={'flex'} backgroundColor={colors.primary[400]}>
    //             <IconButton
    //                 sx={{
    //                     marginLeft: 'auto', marginRight: '2rem', width: '40px', height: '40px', marginTop: '5px'
    //                 }}
    //                 onClick={colorMode.toggleColorMode}>{
    //               theme.palette.mode === 'dark' ? <DarkModeOutlined />
    //                   :
    //               <LightModeOutlined />}</IconButton>
    //         </Box>
    //     )
  return (
    <Box display={'flex'} width="100%" justifyContent= 'space-between' p={2} border="1px solid #3337">
          <Box
              display={'flex'} backgroundColor={colors.primary[400]}
              borderRadius='3px'
          >
              <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Search' />
              <IconButton type='button' sx={{p:1}}>
                  <Search />
              </IconButton>
              
          </Box>

          <Box display={'flex'}>
              <IconButton onClick={colorMode.toggleColorMode}>{
                  theme.palette.mode === 'dark' ? <DarkModeOutlined />
                      :
                  <LightModeOutlined />}</IconButton>
              <IconButton><NotificationsOutlined /></IconButton>
              <IconButton><SettingsOutlined /></IconButton>
              <IconButton><PersonOutline /></IconButton>
              
          </Box>
    </Box>
  )
}

export default TopBar
