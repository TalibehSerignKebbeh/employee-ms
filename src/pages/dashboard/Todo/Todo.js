import React, { useState } from 'react';
import './todo.css'
import { useGetEmployeesQuery } from '../../../features/Employee/EmployeeApiSlice'
import { useAddTodoMutation } from '../../../features/Todo/todoApiSlice'
import { useTheme } from '@mui/material';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import UseAuth from '../../../hooks/UseAuth';
import CircularProgress from '@mui/material/CircularProgress'
import Loaddder from '../../../components/Loaddder';
import CollaboratorsSalect from '../../../components/Select/CollaboratorsSalect';

const Todo = () => {
    const dark = useTheme().palette.mode === 'dark'
    const { username } = UseAuth()
    const [todo, settodo] = useState({
        name: '', dateLine: '', createdBy: username, collabs: []
    });

    const { data: employees, isLoading: loadingEmployees } = useGetEmployeesQuery()

    const [AddTodo, { isLoading, isSuccess: addSuccess,
    isError, error, reset,}]
        = useAddTodoMutation()

   
    const handleAddTodo = async (e) => {
        e.preventDefault()
        // console.log(employees);
        const collabs =
            employees?.map((emp) => todo?.collabs?.includes(emp?.username) ? emp?._id : null).filter((data) => data !== null)
        // console.log(collabs);
        await AddTodo({...todo, collabs}).unwrap()
            .then(res => {
                console.log(res);
            }).catch(err => {
                
            })
    }
   
    return (
        <div className='my-10 w-full'>
            {loadingEmployees ? <Loaddder /> :
                <form className={`${(dark) ? 'bg-slate-500' : 'bg-white'} 
            shadow-lg rounded m-auto mt-10 w-400 flex flex-col h-auto gap-3`}
                    onSubmit={handleAddTodo}>
                    <h2
                        className={`${(dark) ? 'text-white after:bg-white'
                            : 'text-slate-700 after:bg-slate-500'}
                        m-auto capitalize relative pt-7 text-center w-full
                 mt-4 before:h-[10px] before:w-[10px] before:flex 
                 before:m-auto before:rounded-md before:z-10
                 before:relative before:bg-teal-500 before:-mb-[32px]
                 after:h-[3px] after:w-20 after:m-auto after:flex
                 after:relative after:rounded-sm after:-mt-[2px]
                 text-lg`}>
                        Add Todo
                    </h2>
                    {isError?
                        <div className='flex flex-row w-auto  justify-between
                        items-center bg-red-500 md:px-4 sm:px-2 px-1'>
                            <p className={`text-white  my-0 text-center text-xl`}>
                                {error?.status || error?.originalStatus === 500 ? 'internal server error'
                                    : error?.data?.message}
                            </p>
                            <button onClick={() => reset()} type=''
                                className='bg-transparent w-auto h-auto 
                            text-red-400  text-3xl bg-white
                             hover:bg-slate-50
                            p-[10px] rounded-full'>
                                <CloseOutlined />
                            </button>

                        </div> : null}
                    {addSuccess ?
                        <div className='flex flex-row w-auto justify-between 
                        items-center bg-slate-400 md:px-4 sm:px-2 px-1'>
                            <p className={`text-green-400  my-0 text-center text-xl`}>
                                Todo successfully created
                            </p>
                            <button onClick={() => reset()} type=''
                                className=' w-auto h-auto 
                            text-white  text-3xl 
                            p-[10px] rounded-[5px'>
                                x
                                {/* <CloseOutlined sx={{color:'white',bgcolor:'white'}}/> */}
                            </button>
                        </div>
                        : null}

                    <div className='input-container'>
                        <label className={`${(dark) ? 'text-white' : 'text-zinc-700'}`}
                            htmlFor='beginDate'>
                            Title
                        </label>
                        <input className={`border border-slate-900 
                        dark:text-white  
                    text-gray-700 w-40`} type={'text'} value={todo.name}
                            onChange={e => settodo({ ...todo, name: e.target.value })}
                            placeholder="Todo title ......"
                        />
                    </div>

                    <div className='input-container'>
                        <label className={`${(dark) ? 'text-white' :
                            'text-zinc-700'}`} htmlFor='beginDate'>
                            DeadLine</label>
                        <input className={'border border-gray-700 dark:text-white text-gray-700 w-40'}
                            type={'date'} value={todo.dateLine}
                            onChange={e => settodo({ ...todo, dateLine: e.target.value })}
                        />
                    </div>
                    <div className='input-container'>
                        <CollaboratorsSalect
                            todo={todo} setTodo={settodo}
                      employees={employees}  />
                    </div>
                    {isLoading ?
                        <button disabled className='text-lg px-4 py-2 rounded-lg m-auto 
                            relative dark:bg-zinc-200 bg-blue-400 my-5
                            justify-self-end'>
                            <CircularProgress className='loader'
                                sx={{ color: 'white', height: '35px', width: '35px' }}
                            />
                        </button> :
                        <button type='submit'
                            className='text-lg px-4 py-2 rounded-lg  m-auto relative 
                            dark:bg-zinc-200 bg-blue-400 my-5 text-white
                            justify-self-end'>
                            Submit
                        </button>}
                </form>
            }
        </div>
    );
}

export default Todo;
