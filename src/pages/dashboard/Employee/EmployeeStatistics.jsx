import React, { useState } from 'react'
import DashCard from '../../../components/DashCard'
import { GroupOutlined, GroupRemoveOutlined, GroupWorkOutlined,  WorkHistoryOutlined, WorkOffOutlined } from '@mui/icons-material'
import { useTheme } from '@mui/material'


export default function EmployeeStatistics({data}) {
    const employeeCount = data?.employeeCount || 0;
    const activeEmployeeCount = data?.activeEmployeeCount || 0;
    const leaveEmployeeCount = data?.leaveEmployeeCount || 0;
    const deletedEmployeeCount =data?.deletedEmployeeCount || 0;

    const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
      <div className={`w-full flex flex-row flex-wrap mt-3 lg:gap-4 gap-3  
     lg:mx-10 md:mx-3 mx-2
     `}>
      <h3 className={`${(isDark) ? 'text-white' : 'text-gray-900'} 
              mt-3 text-start w-full text-xl sm:text-3xl md:text-4xl ml-1 -mb-2 `}>
                Employees Statistics</h3>
              <DashCard name={'Employees'} 
              icon={<GroupOutlined className='scale-150 m-auto text-white ' />}
               value={employeeCount} />
              <DashCard name={'OnLeave'} 
              icon={<GroupOutlined className='scale-150 m-auto text-white ' />} 
              value={leaveEmployeeCount} />
              <DashCard name={'Active'} 
              icon={<GroupWorkOutlined className='scale-150 m-auto text-white ' />}
               value={activeEmployeeCount} />
              <DashCard name={'Deleted'} 
              icon={<GroupRemoveOutlined className='scale-150 m-auto text-white ' />} 
              value={deletedEmployeeCount} />
            </div>
  )
}
