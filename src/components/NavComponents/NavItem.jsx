import React from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { tokens } from '../../theme'
import { NavLink } from 'react-router-dom';

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
         hover:rounded-r-3xl rounded-r-3xl ${(isSelected && dark) && 'bg-blue-500 '} ${(isSelected && !dark) && 'bg-blue-300 '} rounded-r-3xl
         `}
        onClick={() => setSelected(title)} >
        <IconButton className={`${(isSelected && dark) && 'text-white'} ${(isSelected && !dark) && 'text-blue-500 '} sidebar-icon`}
        sx={{fontSize:'1.3rem'}}>
            {icon}
        </IconButton>
        <Typography sx={{
            paddingLeft: '7px', color: `${colors.grey[100]}`,
        fontSize:'1.1rem'}} >
            {navTitle}
        </Typography>
    </NavLink>

}

export default NavItem;
