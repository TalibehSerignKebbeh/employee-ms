import React from 'react';
import { Button, Stack } from '@mui/material';
import { Send } from '@mui/icons-material';

const Contact = ({person ,setperson, page, setpage}) => {
    return (
        <div className='contact-infor'>
            <h3 className='title'>Contact Information</h3>
            <div className='wrapper'>
                <div className='input-container'>
                    <label htmlFor='telephone'>Telephone</label>
                    <input type={'text'} id="telephone" value={person.telephone}
                        onChange={e => setperson({ ...person, telephone: e.target.value })}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='email'>Email</label>
                    <input type={'email'} id="email" value={person.email}
                        onChange={e => setperson({ ...person, email: e.target.value })}
                    />
                </div>
                
            </div>
            <div className='buttons' >
                <Button variant='contained' color='secondary' onClick={() => setpage(page - 1)}>Prev</Button>
                <Button variant='contained' onClick={()=>setpage(page+1)}>Next</Button>
            </div>
                {/* <Stack direction={'row'} spacing={3} sx={{margin: 'auto'}}>
                    <Button color='secondary' onClick={() => setpage(page - 1)}>Prev</Button>
                    <Button endIcon={<Send />} color='secondary' onClick={()=>setpage(page+1)}>Next</Button>
            </Stack> */}
        </div>
    );
}

export default Contact;
