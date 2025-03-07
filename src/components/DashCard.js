import React from 'react';
import { useTheme } from '@mui/material'
// import { DashboardCustomizeOutlined } from '@mui/icons-material';

const DashCard = ({ name, value, icon }) => {
  const dark = useTheme().palette.mode === 'dark'

  return (
   <div className={`${(dark) ? 'bg-slate-500' : 'bg-white'} lg:w-64 md:w-44 w-36
        shadow md:h-20 h-16  flex flex-row items-center justify-center
        rounded-tr-lg rounded-bl-lg`}>
          <div className='w-2/5 h-full ml-0'>
        <div className='bg-blue-500 inline-flex 
            min-h-full h-full
            w-11/12 -ml-2 mr-auto
            rounded-tr-lg rounded-bl-lg'>
             {icon}
            </div>
          </div>
      <div className={`${(dark) ? 'text-white  after:bg-gray-100' :
        'text-gray-700  after:bg-gray-500'} 
          flex flex-col min-h-full  w-3/5 items-center justify-center text-center
          after:block lg:after:w-36 md:after:w-24
          after:w-20 lg:after:ml-3 mr-[2px] after:ml-2
          after:h-px after:m-auto after:absolute`}>
        <p className={`${(dark) ? 'text-white' : 'text-black'} 
            font-body font-medium my-auto px-1 md:ml-0 mx-auto text-xl `}
            >{name}</p>
        <p className={`${(dark) ? 'text-white' : 'text-black'} 
        font-body font-medium my-auto px-1 md:ml-0 ml-4 text-xl `}>
          {value || 0}</p>
          </div>

        </div>
  );
}

export default DashCard;
