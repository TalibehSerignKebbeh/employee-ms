import React from 'react';
import { Button } from '@mui/material';
import FileBase from 'react-file-base64'
// import { Send } from '@mui/icons-material';


const Others = ({ person, setperson, page, setpage }) => {
    const handleRolesChange = (e) => {
        const value = e.target.options[e.target.selectedIndex].value
        if (person.roles.includes(value)) {
            const newRoles = person.roles.filter(role => role !== value);
            setperson({ ...person, roles: newRoles })
        } else {
            setperson({ ...person, roles: [...person.roles, value] })
        }
    }
    const handleRegister = async(e) => {
        e.preventDefault();
        console.log(person);
    }
    return (
        <form>

        <div className='other-infor'>
            <h3 className='title'>other Information</h3>
            <div className='wrapper'>

                <div className='input-container'>
                    <label htmlFor='username'>Username</label>
                    <input type={'text'} id="username" value={person.username}
                        onChange={e => setperson({ ...person, username: e.target.value })}
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor='password'>Password</label>
                    <input type={'password'} id="password" value={person.password}
                        onChange={e => setperson({ ...person, password: e.target.value })}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='confirmpassword'>ConfirmPassword</label>
                    <input type={'password'} id="confirmpassword" value={person.confirmPassword}
                        onChange={e => setperson({ ...person, confirmPassword: e.target.value })}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='salary'>Job Title</label>
                    <input type={'text'} id="jobTitle" value={person.jobTitle}
                        onChange={e => setperson({ ...person, jobTitle: e.target.value })}
                    />
                </div>
                <Button variant="contained" component="label" sx={{width: '100px', margin: 'auto'}}>
                    Upload
                    {/* <input hidden accept="image/*" multiple type="file" /> */}
                    <FileBase  type='file' accept='image/*' id='profile' multiple={false}
                        onDone={({ base64 }) => setperson({ ...person, profile: base64 })}
                    />
                </Button>
                {/* <div className='input-container profile-container'>
                    <label htmlFor='profile'>
                        Profile
                    </label>
                    <FileBase type='file' id='profile' multiple={false}
                        onDone={({ base64 }) => setperson({ ...person, profile: base64 })}
                    />

                </div> */}

                <div className='input-container'>
                    <label htmlFor='roles'>roles</label>
                    <select
                        id='roles-select'
                        multiple
                        value={person.roles}
                        onChange={handleRolesChange}
                    >
                        <option value={'admin'}>admin</option>
                        <option value={'manager'}>manager</option>
                        <option value={'employee'}>employee</option>
                        <option value={'CEO'}>CEO</option>
                    </select>
                </div>

            </div>
            <div className='buttons' >
                <Button variant='contained' color='secondary'  onClick={() => setpage(page - 1) }>Prev</Button>
                    <Button sx={{marginLeft: 3}}
                        variant='contained'  onClick={handleRegister}>Submit </Button>
            </div>
            </div>
        </form>
            
    );
}

export default Others;
