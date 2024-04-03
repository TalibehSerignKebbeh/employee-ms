import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const roles = [
    'employee','admin','manager','secretary','CEO']
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(role, roles, theme) {
  return {
    fontWeight:
      roles?.indexOf(role) === -1
        ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
      bgcolor: theme?.palette.mode ==='dark'
          ? theme.palette.success.light
          : theme.palette.success.dark,
  };
}

export default function RolesSelect({ employee, setEmployee}) {
    const theme = useTheme();
    const dark = theme.palette.mode === 'dark'

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
     setEmployee({...employee, roles: value})
  };

  return (
    <div>
          <FormControl sx={{
              m: 1,ml:0, mr:'auto', width: '100%',minWidth:'140px',
              // bgcolor: dark ? '#fff' : '#3335',
              // color: dark? '#333':'#fff'
          }}>
              <InputLabel id="collaborators_select"
              sx={{color:dark? '#fff':'#00004d', fontSize:'1rem'}}>
                  Roles
              </InputLabel>
        <Select
          labelId="collaborators_select"
                  id="demo-multiple-chip"
                  sx={{bgcolor: 'inherit'}}
          multiple
          value={employee?.roles}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                  <Chip key={value} label={value} 
                      sx={{bgcolor: 'green', color:'#fff'}}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {roles?.map((role, index) => (
              <MenuItem
              sx={{
                bgcolor: dark ? '#3349' : '#fff',
              color: employee?.roles?.includes(role) ? 'green' :'inherit'
            }}
              key={index}
              value={role}
              style={getStyles(role, employee?.roles, theme)}
            >
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}