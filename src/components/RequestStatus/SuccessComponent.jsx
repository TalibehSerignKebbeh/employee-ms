import React from 'react'
import image from '../../assets/images/successfully-done-5627021-4699001.gif'

const SuccessComponent = ({message, ResetFunc= ()=>{}}) => {
    return (
        <div className='h-auto bg-gradient-to-bl from-green-400 via-green-800
         to-green-400
         w-11/12 sm:w-9/12 md:w-[500px] py-4 rounded-md
         mx-auto'>
                <img 
                    loading='lazy'
                    src={image}
                    alt=''
                    className='mx-auto
                   rounded-[60%] my-3 h-48 w-4h-48'
            />
            <div className='w-fit mx-auto text-start'>
            <p className='text-white text-xl py-3 '>
                {message}
            </p>
                <button className='bg-white text-slate-800 
                px-7 py-2 rounded text-lg'
                onClick={ResetFunc}>
                    reset
                </button>
</div>
        </div>
    );
}

export default SuccessComponent;
