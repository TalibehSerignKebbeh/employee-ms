import React from 'react'
import DashCard from '../../../components/DashCard'
import  WorkOffOutlined  from '@mui/icons-material/WorkOffOutlined'
import { useTheme } from '@mui/material'

export default function LeaveStatistic({ data }) {
    let leavesCount = data?.leavesCount || 0;
    let pendingLeaveCount = data?.pendingLeavesCount || 0;
    let activeLeavesCount = data?.activeLeavesCount || 0;
    let acceptedLeavesCount = data?.acceptedLeavesCount || 0;
    let rejectedLeavesCount = data?.rejectedLeavesCount ||0

    const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
      <div className={`w-full flex flex-row flex-wrap mt-3 lg:gap-4 gap-3 
     lg:mx-10 md:mx-3 mx-2 `}>
      <h3 className={`${(isDark) ? 'text-white' : 'text-gray-900'} 
              mt-3 text-start w-full text-xl sm:text-3xl md:text-4xl ml-1 -mb-2 `}>
               Leaves Statistics</h3>
              <DashCard name={'Leaves'} 
              icon={<WorkOffOutlined 
              className='scale-150 m-auto text-white ' 

              />} 
              value={leavesCount} 
              />
              <DashCard name={'Pending'} 
              icon={<WorkOffOutlined 
              className='scale-150 m-auto text-white ' 
              />} 
              value={pendingLeaveCount} 
          />
          <DashCard name={'Active'} 
              icon={<WorkOffOutlined 
              className='scale-150 m-auto text-white ' 
              />} 
              value={activeLeavesCount} 
          />
                    <DashCard name={'Accepted'} 
              icon={<WorkOffOutlined 
              className='scale-150 m-auto text-white ' 
              />} 
              value={acceptedLeavesCount} 
              />
              <DashCard
               name={'Rejected'} 
              icon={<WorkOffOutlined 
              className = 'scale-150 m-auto text-white  '
               />}
               value={rejectedLeavesCount} 
              />
            </div>
  )
}
