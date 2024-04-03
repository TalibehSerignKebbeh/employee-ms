import React from 'react';

const ProfileInput = ({ type = 'text', title, otherProps }) => {
    return (
        <input type={type}
            {...otherProps}
             className='px-[5px] py-2 h-12 text-lg border
                         border-gray-900 focus-within:border-[4px]
                         focus-within:border-black
                         rounded
                         min-w-[90%] max-w-xs w-fit sm:w-[400px] sm:min-w-[400px]
                          bg-inherit'
            placeholder={`enter ${title}`}                 
        />
            
    );
}

export default ProfileInput;
