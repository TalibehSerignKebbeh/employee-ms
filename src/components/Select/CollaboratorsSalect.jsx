import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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


function getStyles(collab, collaborators, theme) {
  return {
    fontWeight:
      collaborators.indexOf(collab) === -1
        ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
      bgcolor: theme?.palette.mode ==='dark'
          ? theme.palette.secondary.main
      : theme.palette.secondary.light,
   
  };
}

export default function CollaboratorsSalect({employees, todo, setTodo}) {
    const theme = useTheme();
    const dark = theme.palette.mode === 'dark'

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
     setTodo({...todo, collabs: value})
  };

  return (
    <div>
          <FormControl sx={{
              m: 1,ml:0, mr:'auto', width: '100%',minWidth:'140px',
              bgcolor: dark ? '#fff' : '#3335',
              color: dark? '#333':'#fff'
          }}>
              <InputLabel id="collaborators_select"
              sx={{color:dark? '#fff':'#00004d', fontSize:'1rem'}}>
                  Collaborators
              </InputLabel>
        <Select
          labelId="collaborators_select"
                  id="demo-multiple-chip"
                  sx={{bgcolor: dark? 'lightgray' : 'white'}}
          multiple
          value={todo?.collabs}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                  <Chip key={value} label={value} 
                      sx={{color: 'green'}}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {employees?.map((employee, index) => (
              <MenuItem
              sx={{
                // bgcolor: dark ? '#3346' : '#fff'
                  bgcolor: dark ? '#3346' : '#fff',
              color: todo?.roles?.includes(employee?.username) ? 'green' :'inherit'
   
              }}
              key={index}
              value={employee?.username}
              style={getStyles(employee?.username, todo?.collabs, theme)}
            >
              {employee?.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}