import React from 'react';

const ContactInfor = ({employee, setemployee, page, setPage}) => {
    return (
        <div>
            <h4>Contact Information</h4>
            <div className='form-btn-group'>
                    <button onClick={e=>setPage(page-1)} >Prev</button>
                    <button onClick={e=>setPage(page+1)} >Next</button>
                </div>
        </div>
    );
}

export default ContactInfor;
