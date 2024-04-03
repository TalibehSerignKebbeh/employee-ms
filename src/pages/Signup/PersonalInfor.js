import { Button } from '@mui/material';
import React, { useState } from 'react';

const PersonalInfor = ({ person, setperson, page, setpage }) => {
    const [valid, setvalid] = useState(false);
    return (
        <div className='personal-infor'>
            <h3 className='title'>Personal Information</h3>
            <div className='wrapper'>
                <div className='input-container'>
                    <label htmlFor='firstName'>First Name</label>
                    <input type={'text'} id="firstName" value={person.firstName}
                        onChange={e => setperson({ ...person, firstName: e.target.value })}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='middleName'>Middle Name</label>
                    <input type={'text'} id="middleName" value={person.middlename}
                        onChange={e => setperson({ ...person, middleName: e.target.value })}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type={'text'} id="lastName" value={person.lastname}
                        onChange={e => setperson({ ...person, lastName: e.target.value })}
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor='address'>Address</label>
                    <input type={'text'} id="address" value={person.address}
                        onChange={e => setperson({ ...person, address: e.target.value })}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='gender'>Gender</label>
                    <select
                        value={person.gender}
                        onChange={e => setperson({ ...person, gender: e.target.value })}
                    >
                        <option value={''}>Choose gender</option>
                        <option value={'male'}>male</option>
                        <option value={'female'}>female</option>
                        <option value={'other'}>other</option>
                    </select>

                </div>
            </div>
            <div className='buttons' >
                <Button disabled>Prev</Button>
                <Button variant='contained' disabled={valid? true: false} onClick={()=>setpage(page+1)}>Next</Button>
         </div>
        </div>
    );
}

export default PersonalInfor;
