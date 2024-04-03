import { useTheme } from '@mui/material';
import React from 'react'
import DashCard from '../../../components/DashCard';
import  WorkHistoryOutlined  from '@mui/icons-material/WorkHistoryOutlined';

export default function TodoStatistics({ data }) {
    
     const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

    const todoCount = data?.todoCount || 0;
const deletedTodoCount = data?.deletedTodoCount || 0;
const pendingTodoCount =  data?.pendingTodoCount || 0;
    const completedTodoCount = data?.completedTodoCount || 0;
    
  return (
      <div className={`w-full flex flex-row flex-wrap mt-3 lg:gap-4 gap-3  
     lg:mx-10 md:mx-3 mx-2`}>
      <h3 className={`${(isDark) ? 'text-white' : 'text-gray-900'} 
              mt-3 text-start  w-full text-xl ml-1 -mb-2 `}>
               Todos Statistics</h3>
              <DashCard name={'Todo'} icon={<WorkHistoryOutlined className='scale-150 m-auto text-white ' />} 
              value={todoCount} 
              />
              <DashCard name={'Pending'} icon={<WorkHistoryOutlined className='scale-150 m-auto text-white ' />} 
              value={pendingTodoCount} 
              />
              <DashCard name={'Complete'} icon={<WorkHistoryOutlined className = 'scale-150 m-auto text-white  ' />}
               value={completedTodoCount} 
          />
           <DashCard name={'Deleted'} icon={<WorkHistoryOutlined className = 'scale-150 m-auto text-white  ' />}
               value={deletedTodoCount} 
              />
            </div>

  )
}
