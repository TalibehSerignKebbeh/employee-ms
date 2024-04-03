import React from 'react'
import { useTheme } from '@mui/material';
// import CloseOutlined from '@mui/icons-material/CloseOutlined';
// import CircularProgress from '@mui/material/CircularProgress'
// import { useUpdateTodoMutation } from '../../../features/Todo/todoApiSlice';
import CollaboratorsSalect from '../../../components/Select/CollaboratorsSalect';


export default function EditForm({ todo, setTodo, employees,
  handleSubmit,handleClose,
isLoading}) {
  
  const isDark = useTheme().palette.mode === 'dark'


  return (

      <form className={` m-auto w-full h-full flex flex-col gap-3`}
        onSubmit={handleSubmit}>
      <div className='self-start ml-0 mr-auto 
      flex flex-row lg:flex-nowrap 
        md:flex-wrap sm:flex-wrap flex-wrap
        gap-x-10 gap-y-7 w-full
        items-center justify-start'>
          <div className='flex flex-col w-auto md:min-w-[250px] sm:min-w-[90%] max-w-[100%] '>
          <label className={`${(isDark) ? 'text-white' : 'text-zinc-700'}
            text-[1.1rem]
            ${todo?.deleted ? 'line-through' : ''}`}
              htmlFor='name'>
              Title
            </label>
            <input className={`w-full border border-gray-700 dark:text-white 
                    text-gray-700 text-lg px-[5px] py-[5px] rounded-md
                    ${isDark ? 'border-blue-300' : 'border-slate-600'}`}
              type={'text'} value={todo?.name}
              disabled={todo?.deleted} name='name' id='name'
              onChange={e => setTodo({ ...todo, name: e.target.value })}
              placeholder="Todo title ......"
            />
          </div>

          <div className='flex flex-col w-auto md:min-w-[250px] sm:min-w-[90%] max-w-[100%]'>
            <label className={`${(isDark) ? 'text-white' :
              'text-zinc-700'} text-[1.1rem]
              ${todo?.deleted ? 'line-through' : ''}`} htmlFor='deadLine'>
              DeadLine</label>
            <input className={`border border-gray-800 dark:text-white 
            text-gray-700 w-full px-[5px] py-[5px] text-lg rounded-md`}
              type={'date'} value={todo.dateLine?.slice(0, 10)}
              name='deadLine' id='deadLine'
              disabled={todo?.deleted}
              onChange={e => setTodo({ ...todo, dateLine: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-auto md:min-w-[250px] sm:min-w-[90%] max-w-[100%]'>
            <CollaboratorsSalect todo={todo}
              setTodo={setTodo}
              employees={employees}
            />
           

          </div>
        <div className='flex flex-row flex-wrap md:gap-x-28
          sm:gap-x-10 gap-x-6 gap-y-4 items-center justify-start
          w-full'>

            <div className='flex flex-col gap-0'>
              <h5 className={`self-start ${(isDark) ?
                'text-white' : 'text-gray-700'}
              ${todo?.deleted ? 'line-through' : ''}`}
              >
                Delete
              </h5>

              <button type='button'
                className={`w-20 h-10 bg-slate-400 rounded-md 
              border 
             ${todo?.deleted ? 'border-red-700 bg-red-200' : 'border-green-400 bg-transparent'}`}
                onClick={() => setTodo({ ...todo, deleted: !todo?.deleted })}>
                <span className={`w-8 h-8 rounded-[50%] bg-slate-300
              relative block transition-[margin]
              ${todo?.deleted ? 'bg-red-500 ml-auto mr-0' : 'bg-slate-300 ml-0 mr-auto'}
             `}></span>
              </button>
            </div>

            <div className='flex flex-col gap-0 '>
              <h5 className={`self-start ${(isDark) ?
                'text-white' : 'text-gray-700'}
              ${todo?.deleted ? 'line-through' : ''}`}
              >
                Complete
              </h5>

              <button disabled={todo?.deleted} type='button'
                className={`w-20 h-10 bg-slate-400 rounded-md 
              border ${todo?.deleted ? 'line-through' : ''}
             ${todo?.isComplete ? 'border-red-700 bg-green-100' : 'border-green-400 bg-transparent'}`}
                onClick={() => setTodo({ ...todo, isComplete: !todo?.isComplete })}>
                <span className={`w-8 h-8 rounded-[50%] bg-slate-300
              relative block transition-[margin]
              ${todo?.isComplete ? 'bg-teal-400 ml-auto mr-0' : 'bg-slate-200 ml-0 mr-auto'}
             `}></span>
              </button>
            </div>
          </div>

      </div>
      
      
      <div className='self-end flex flex-row justify-end items-center
          gap-5'>
        
          <button type='submit' disabled={isLoading}
            className='text-lg px-4 py-2 rounded-lg  m-auto relative 
                            dark:bg-zinc-200 bg-blue-400 mt-5 mb-2 text-white
                            justify-self-end'>
            {isLoading? "Loading....." :"Submit"}
        </button>
        <button type='reset'
           disabled={isLoading}
          className='text-lg px-4 py-2 rounded-lg  m-auto relative 
                            dark:bg-zinc-200 bg-orange-400 mt-5 b-2 text-white
                            justify-self-end'
        onClick={handleClose}>
          Close
        </button>
        </div>
        
      </form>
  )
}
