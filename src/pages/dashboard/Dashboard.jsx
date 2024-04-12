// import { Paper, TableBody, TableCell, TableContainer, TableRow, useTheme } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { apiInstance } from '../../api'
import UseAuth from '../../hooks/UseAuth'
import UserTable from '../../components/TableHeads/UserTable'
import Loaddder from '../../components/Loaddder'
import EmployeeStatistics from './Employee/EmployeeStatistics'
import LeaveStatistic from './Leave/LeaveStatistic'
import TodoStatistics from './Todo/TodoStatistics'


export default function Dashboard({ selected, setSelected }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const [loadingData, setloadingData] = useState(false);
  const [isError, setisError] = useState(false);
  const [employees, setemployees] = useState([]);
  const [statisticsData, setstatisticsData] = useState(null);
  const { token, isAdmin, } = UseAuth()

  useEffect(() => {
    setSelected("dashboard")
    if (!token) return new AbortController().abort()
    const fetchData = async () => {
      setloadingData(true)

      await apiInstance(token).get(`/dashboard_stats`)
        .then(res => {
          // console.log(res?.data);
          setstatisticsData(res?.data)
          console.log(res?.data);
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
            setloadingData(false)
        })
    }
    fetchData()
    // const fetchAllData = async () => {
    //   setloadingData(true)
    //   const employeeFetch = apiInstance(token).get('/employee')
    //   const leaveFetch = apiInstance(token).get('/leave')
    //   const todoFetch = apiInstance(token).get('/todo')
    //   await axios.all([employeeFetch, leaveFetch, todoFetch]).then(axios.spread((...response) => {
    //     setloadingData(false)
    //     console.log(response[0].data);
    //     setemployees(response[0]?.data)
    //     setactiveEmps(employees?.filter(emp => emp?.active))
    //     setempsOnLeave(employees?.filter(em => em?.onLeave))
    //     setdeletedEmps(employees?.filter(emp => emp?.deleted))
    //     // setemployees(employees?.sort((Emp1, Emp2)=> Emp1?.createdAt - Emp2?.createdAt))
    //     // setrecentlyAddedEmps(employees?.)
    //     setleaves(response[1]?.data)
    //     console.log(response[1]?.data);
    //     setpendingLeaves(leaves?.filter(leave => !leave?.accepted))
    //     setrejectLeaves(leaves?.filter(leave=>leave?.rejected))
    //     settodos(response[2]?.data)
    //     setpendingTodos(todos?.filter(todo=>!todo?.isComplete))
    //     setcompletedTodos(todos?.filter(todo => todo?.icComplete))
    //   })).catch(err => {
    //     console.log(err);
    //     setloadingData(false)
    //     setisError(true)
    //   })

    // }
    // fetchAllData()
  }, [])

  return (
    <Box width="100%" textAlign={'center'} margin="auto"
      sx={{ position: 'relative' }}
    >
      {(loadingData) ? <Loaddder /> :
        isError ?
          <p className='text-lg font-display 
          my-4 max-w-full  font-bold text-italic text-center px-2'>
            An Error! ocurred while fetching data please check your console for more details</p>
          :
          <>
            <h3 className={`${(isDark) ? 'text-white' : 'text-gray-800'} px-3 mt-1 text-start min-w-full w-full 
            after:block after:p-0 after:m-auto after:w-full after:h-px after:bg-red-400 `}
            >
              Dashboard
            </h3>
            {isAdmin ?
              <EmployeeStatistics data={statisticsData} /> : null}
            <TodoStatistics data={statisticsData} />
            <LeaveStatistic data={statisticsData} />
            <Box mt="20px" height={'auto'} width="100%">
              {employees?.length ? <Box m="10px" className="shadow lg:w-1/2 md:h-3/5 w-full" >
                <h3 className={`${(isDark) ? 'text-white' : 'text-gray-400'} text-sm font-semibold `}>
                  Recently added employees</h3>
                <TableContainer component={Paper} className="shadow">
                  <Table>
                    <UserTable />
                    <TableBody>
                      {employees?.map((emp, id) => (
                        <TableRow key={id}>
                          <TableCell>{emp?.firstName}</TableCell>
                          <TableCell>{emp?.lastName}</TableCell>
                          <TableCell>{emp?.username}</TableCell>
                          <TableCell>{emp?.jobTitle}</TableCell>
                          <TableCell>{"D" + emp?.salary}</TableCell>
                          <TableCell>{emp?.address}</TableCell>
                          <TableCell sx={{
                            padding: '4px',
                            backgroundColor: '#00ff00',
                            color: (emp?.active) ? '#fff' : '#ff4d4d'
                          }}
                          >{emp?.active ? "active" : "inactive"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                  </Table>
                </TableContainer>
              </Box> : null}

            </Box>
          </>

      }
    </Box>
  )
}
