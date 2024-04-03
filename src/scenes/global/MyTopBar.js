import React, { useContext,  } from 'react'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import  LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import  MenuOutlined from '@mui/icons-material/MenuOutlined';
import './mytopbar.css'
import { ColorModeContext } from '../../theme';
import { useTheme } from '@mui/material/styles';
import IconButton  from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import UseAuth from '../../hooks/UseAuth';


export default function MyTopBar({activeMenu, setactiveMenu}) {
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)

    const dark = theme.palette.mode === 'dark'
    const { token } = UseAuth()
    if (!token)
        return null

    return (
        <Box className={`${(dark) ?"text-gray-50 bg-gray-800" : "text-gray-100 bg-white"} 
          align-middle h-16  shadow flex flex-row justify-between items-center py-4`}
            width="100%" sx={{ pr: { xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }, py:3 }}
        >
          {token?  <div>
                <IconButton
                        sx={{
                            left: `10px`,
                            top:'5px',
                        position: `relative`, zIndex: 200,
                            
                        }}
                        onClick={() => setactiveMenu(!activeMenu)}>
                        <MenuOutlined sx={{
                            scale: 3,
                            width: '35px', height: '35px',
                            zIndex:200
                        }} />
                    </IconButton>
            </div> 
            : null
          }

            <div style={{
                display: 'flex', alignItems: 'center',
                marginLeft: 'auto', marginRight: '10px'
            }}>
                <button style={{ marginRight: '3px' }} 
                    className={`${(dark) ? 'bg-gray-300' : 'bg-gray-600'} 
                    w-12 h-12 inline-flex rounded-3xl
                   `}
                    onClick={colorMode.toggleColorMode}>

                    {theme.palette.mode === 'dark' ?
                        <LightModeOutlined className='m-auto' /> :
                        <DarkModeOutlined className='m-auto' />
                    }
                </button>
                
            </div>
        </Box>

    )
    
}
