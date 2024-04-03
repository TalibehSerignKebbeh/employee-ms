import React from 'react';
import UseInput from './UseInput';
import ProfileInput from './ProfileInput';

const EmpInputContainer = ({ errors = null,
    registerProps, inputTye = 'text', title, isProfile=false, }) => {
    let formattedTitle = title?.trim()?.split('_')?.join(' ')?.toLowerCase()
    
    return (
        <div className='grid auto-rows-auto gap-0 h-auto '>
            <label className='text-lg capitalize
            ' htmlFor={title}>{formattedTitle}
            </label>
            {isProfile ?
                <ProfileInput
                title={formattedTitle}
                otherProps={registerProps}
                type={inputTye}
            />
               : <UseInput
                title={formattedTitle}
                otherProps={registerProps}
                type={inputTye}
            />}
            {errors[title]?.message?.length ?
                <p className='text-red-500'>
                {errors[title]?.message}
                </p>
                :
                null
            }
        </div>
    );
}

export default EmpInputContainer;
