import React from 'react';
import Skeleton from "@mui/material/Skeleton";

const Loader = () => {
    return (
        <div className='flex flex-col gap-0 '>
            <Skeleton height={'80px'}
                width={'100%'}
            /> 
            <Skeleton height={'80px'}
                width={'100%'}
            /> 
            <Skeleton height={'80px'}
                width={'100%'}
            />
             <Skeleton height={'80px'}
                width={'100%'}
            />
            {/* <Skeleton
             height={'50px'}
                // width={{lg:'50%', md:'60%',sm:'70%', xs:'90%'}}
                width={'50px'} 
                sx={{
                    borderRadius: '50%',
                mt:-5}}
           />  */}
        </div>
    );
}

export default Loader;
