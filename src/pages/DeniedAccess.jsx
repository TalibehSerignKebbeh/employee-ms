import { NotAccessible } from '@mui/icons-material';
import { useTheme } from '@mui/system';
import React from 'react';
import { BiAccessibility } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const DeniedAccess = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    // ${(dark) ? 'bg-gray-800' : 'bg-white'} 
    const dark = theme.palette.mode==='dark'
    return (
        <div className={`flex w-full h-full text-center my-6`}>
            <div className={`max-h-80 h-64 w-96 m-auto relative  ${(dark) ? 'bg-slate-500' : 'bg-slate-100'} shadow
             flex-col gap-2 items-center justify-center`} >
                <div className='inline-flex m-auto w-full mt-4 '>
                    <BiAccessibility className=' mx-auto mb-2 not-found-icon'
                        scale={'5'} 
                    />
                </div>
                <h2 className='text-red-500 text-2xl py-1 text-start px-3 font-bold'>Access Denied</h2>
                <p className={`mt-2 px-3 ${(dark) ? 'text-gray-100' : 'text-black'} m-auto my-auto text-xl w-full  text-start`}>Contact your admin to reset your account</p>
                <p className='cursor-pointer ' onClick={()=>navigate(-1)}>Go Back</p>
            </div>
            
        </div>
    );
}

export default DeniedAccess;
