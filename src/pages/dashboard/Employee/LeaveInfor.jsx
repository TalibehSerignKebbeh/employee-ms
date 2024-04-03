import React from 'react';
import { FormatDate } from '../../../utils/CommonFunctions';

const LeaveInfor = ({leave}) => {
    return (
        <div className='w-fit  col-span-2 flex flex-row flex-wrap gap-3
         bg-gradient-to-r border border-amber-100 py-2 sm:py-14 md:py-20 px-[6px] sm:px-5
          rounded shadow-sm shadow-current'>
            <div className='w-full -mb-1 '>
                <h2 className='capitalize text-base' >Current Leave details</h2>
            </div>
            <div className='grid grid-cols-1 grid-rows-2 w-fit gap-0
             items-start content-start'>
                <span className='text-sm capitalize'>category</span>
                <span className='capitalize text-lg'>
                {leave?.category}
                </span>
            </div>
            <div className='grid grid-cols-1 grid-rows-2 w-fit gap-0
             items-start content-start'>
                <span className='text-sm capitalize'>Start date</span>
                <span className='capitalize text-lg'>
                {FormatDate(leave?.beginDate, 'MMM Mo yyy') }
                </span>
            </div>
            <div className='grid grid-cols-1 grid-rows-2 w-fit gap-0
             items-start content-start'>
                <span className='text-sm capitalize'>End date</span>
                <span className='capitalize text-lg'>
                {FormatDate(leave?.endDate, 'MMM Mo yyy') }
                </span>
            </div>
            </div>
    );
}

export default LeaveInfor;
