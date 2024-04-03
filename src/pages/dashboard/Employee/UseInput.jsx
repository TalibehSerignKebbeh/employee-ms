import React from 'react';

const UseInput = ({ type = 'text', title, otherProps }) => {
    return (
        <input type={type}
            {...otherProps}
             className='px-[5px] py-2 h-12 text-lg border
                         border-gray-900 focus-within:border-[4px]
                         focus-within:border-black
                         rounded  bg-inherit'
            placeholder={`enter ${title}`}                 
        />
            
    );
}

export default UseInput;
