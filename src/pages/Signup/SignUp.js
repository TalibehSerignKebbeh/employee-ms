import React, { useState } from 'react';
import Contact from './Contact';
import PersonalInfor from './PersonalInfor';
import Others from './Others';

const SignUp = () => {
    const [person, setperson] = useState({firstName: '', lastName: '', middleName: '', password: '',confirmPassword: '', email: '', telephone: '', jobTitle: '',
       address: '',gender:'', roles: [], 
        
    });
    const [page, setpage] = useState(0);
    const SignUpComponent = [
        <PersonalInfor person={person} setperson={setperson} page={page} setpage={setpage} />,
        <Contact person={person} setperson={setperson} page={page} setpage={setpage} />,
        <Others person={person} setperson={setperson} page={page} setpage={setpage} />
    ]
    return (
        <div>
            {SignUpComponent[page]}
            
        </div>
    );
}

export default SignUp;
