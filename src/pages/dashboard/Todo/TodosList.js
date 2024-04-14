import React, {  useRef, useState } from 'react';
import { useGetTodosQuery, } from '../../../features/Todo/todoApiSlice';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Collapse from '@mui/material/Collapse'
import EmptyData from '../../../components/EmptyData';
import UseAuth from '../../../hooks/UseAuth';
import { roles } from '../../../config/Roles';
import Loaddder from '../../../components/Loaddder';
import TodoRow from './TodoRow';
// import PeopleOutlineOutlined from '@mui/icons-material/PeopleOutlineOutlined'
// import DetailsOutlined from '@mui/icons-material/DetailsOutlined'
import { useTheme } from '@mui/material/styles';
import Todo from './Todo';
import { useGetEmployeesQuery } from '../../../features/Employee/EmployeeApiSlice';
import PaginateComp from '../../../components/Pagination/Pagination';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

const TodosList = () => {

    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'
    const { UserRoles } = UseAuth()
    const [page, setpage] = useState(0);
    const pageSize = 10;
    const [openAddTodo, setopenAddTodo] = useState(false);
    
    const { data, isLoading: todoLoading,
     isSuccess, error, refetch: refetchTodo,
    }
        = useGetTodosQuery(page, pageSize);

    const { data: employeeData,
    } = useGetEmployeesQuery();

      const containerRef = useRef(null)
  useGSAP(() => {
    gsap.fromTo('.todoInforWrapper', {
      y: -1000,
      scale: 0.3
    }, { y: 0, scale: 1 })

  }, { scope: containerRef.current })
    
    // console.log(data);
    return (
        <Container sx={{}}
        ref={containerRef}>

            <h3 className={`${(isDark) ? 'text-white' : 'text-gray-800'} px-3 text-start min-w-full w-full 
            my-4 mt-8
            after:block after:p-0 after:m-auto after:w-full after:h-px after:bg-red-400 `}
            >
                Todos Page
            </h3>
            {todoLoading ? <Loaddder loadingText={'loading todos'}/> :
                <div className='todoInforWrapper'>
                     <div className={`my-3 rounded-lg ml-1 `}>
                                <div className='flex justify-end'>
                                   <button
                                    className={`px-4 py-2 rounded-md 
                                    bg-teal-600 m-2
                                    text-sm uppercase text-white
                                     `}
                                    onClick={e => setopenAddTodo(prev => !prev)}
                                    >Add Todo
                                    </button>
                                </div>
                                <Collapse in={openAddTodo}>
                                    <div className={`${isDark ? 'bg-slate-700' : 'bg-slate-200'}
                                    py-5 rounded-xl`}>
                                        <Todo />
                                    </div>
                                </Collapse>
                    </div>
                    
                    {data?.todos?.length ?
                        <div className='mb-3'>
                           
                            <TableContainer component={Paper}
                                sx={{
                                    width: 'auto', mt: '10px',
                                    bgcolor: isDark ? "#1F2937" : '#fff',
                                    // py:3,px:1,
                                }}
                                // className={`${isDark? 'bg-gray-800':'bg-white'}`}
                            >
                                <Typography component={'h3'}
                                    sx={{
                                        marginY: 3, textAlign: 'center',
                                        fontSize: '1.1rem', textTransform: 'capitalize',
                                        fontStyle: 'italic'
                                    }}
                                >{UserRoles?.roles?.includes(roles.admin)
                                    || UserRoles?.roles?.includes(roles.manager) ?
                                    "All Todos List" :
                                    "Your Todos List"}
                                </Typography>
                                <Table sx={{p:2}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center' sx={{
                                                // fontSize: '2rem'
                                                fontSize: '1.1rem'
                                            }}>
                                                {/* <DetailsOutlined
                                                    sx={{ fontSize: '2rem' }} /> */}
                                                Details
                                            </TableCell>
                                            <TableCell align='left' sx={{ fontSize: '1.1rem' }}>
                                                Title
                                            </TableCell>
                                            <TableCell align='left' sx={{ fontSize: '1.1rem' }}>
                                                DeadLine
                                            </TableCell>
                                            
                                            <TableCell align='left' sx={{ fontSize: '1.1rem' }}
                                            >
                                                <span
                                                    className='p-[6px] bg-green-400 rounded-md'>
                                                    Status
                                                </span>
                                            </TableCell>
                                             <TableCell align='left' sx={{ fontSize: '1.1rem' }}>
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {data?.todos?.map((todo, index) => (
                                            <TodoRow
                                                key={index}
                                                todo={todo}
                                                refetchTodo={refetchTodo}
                                                employees={employeeData}
                                            />

                                        ))
                                        }
                                    </TableBody>
                                </Table>
                                <div className='w-full flex justify-center text-center mx-auto
                                my-3'>
                                    <PaginateComp 
                                        page={page} setpage={setpage}
                                        total={data?.total}
                                        pageSize={pageSize}
                                   />
                                </div>
                            </TableContainer>
                        </div>
                        : isSuccess? 
                            <EmptyData name={"Todos"} />
                            :
                            <div className='w-auto mx-auto my-6 border-2 
                            border-slate-400 p-2 py-3 rounded-lg bg-red-500 '>
                                <h4 className='text-slate-900'>
                                    !opps an error occurred</h4>
                                <p className='text-sm font-semibold text-slate-900'>
                                    {!error?.originalStatus ?
                                        'no response from api server' :
                                        (error?.originalStatus === 500) ?
                                    'Internal server error':
                                    error?.data?.message }</p>
                            </div>
                    }
                </div>
            }

        </Container>
    );
}

export default TodosList;
