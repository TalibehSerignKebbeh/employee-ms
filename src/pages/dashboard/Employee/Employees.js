import React, { useEffect, useState, } from 'react';
import { useGetEmployeesQuery } from '../../../features/Employee/EmployeeApiSlice';
import { roles } from '../../../config/Roles';
import Loaddder from '../../../components/Loaddder';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useTheme } from '@mui/material/styles';
import AddBox from '@mui/icons-material/AddBox';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import UseAuth from '../../../hooks/UseAuth';
import AddModal from './ActionFiles/AddModal';
import EmpRow from './EmpRow';
import { Tooltip } from '@mui/material';


const Employees = ({ selected, setSelected }) => {
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark';
    const [showAdd, setshowAdd] = useState(false);
    const { roles:UserRoles } = UseAuth()

    const { data: empsData, isLoading: empLoading, isError, error
    }
        = useGetEmployeesQuery("employees", {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,

        })


    useEffect(() => {
        setSelected("employees")
        return () => {

        };
    }, [setSelected]);

    return (
        <Box maxWidth={'1200px'} width="100%" margin={'auto'}
        >
            {isError &&
                <Box
                    sx={{
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center',
                        height: 'auto', padding: '14px auto 14px auto',
                        paddingBlock: '20px', pt: '30px',
                        width: "auto", margin: 'auto', marginTop: '30px',
                        bgcolor: "maroon", borderRadius: '7px',
                        maxWidth: '500px',
                    }}>
                    <ErrorOutline sx={{
                        transform: 'scale(3)', color: 'white',
                        mb: '20px'
                    }} />
                    <h4 className='text-slate-200'>
                        !opps an error occurred</h4>
                    <p className='text-lg font-semibold text-slate-200
                    capitalize'>
                        {!error?.originalStatus ?
                            'no response from api server' :
                            (error?.originalStatus === 500) ?
                                'Internal server error' :
                                error?.data?.message}
                    </p>
                </Box>}
            {empLoading ? <Loaddder /> :
                <>
                    <h3 className={`${(isDark) ? 'text-white' : 'text-gray-800'} px-3 text-start min-w-full w-full 
            my-4 mt-8
            after:block after:p-0 after:m-auto after:w-full after:h-px after:bg-red-400 `}
                    >
                        Manage Employees
                    </h3>
                    <div className=''>
                        <div className='flex justify-end md:px-8 sm:px-8 px-6
                         '>
                            <button onClick={e => setshowAdd(true)}
                                className='mb-10 mt-2 '>
                                <Tooltip title="add employee"
                                    classes={{
                                    tooltip:'tooltip-text'
                                }}>

                                <AddBox sx={{ transform: 'scale(5,3)' }} />
                                </Tooltip>
                            </button>
                        </div>
                        <TableContainer 
                            component={Paper} variant="elevation" sx={{
                                fontWeight: "bold", marginBottom: 3, fontSize: "",
                                color: (isDark) ? '#fff' : 'black',
                                bgcolor: isDark ? "#1F2937" : '#fff'
                            }} className={`${(isDark) ? "#1F2937" : "bg-white"} shadow `}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        <TableCell sx={{ fontSize: '1.2rem' }} align='left'
                                        >Name</TableCell>
                                        <TableCell sx={{ fontSize: '1.2rem' }} align='left'
                                        >Username</TableCell>
                                        <TableCell sx={{ fontSize: '1.2rem' }} align='left'
                                        >Telephone</TableCell>
                                        <TableCell sx={{ fontSize: '1.2rem' }} align='left'
                                        >Email</TableCell>
                                        {/* <TableCell sx={{color: colors.grey[100]}}>Address</TableCell> */}
                                        <TableCell sx={{ fontSize: '1.2rem' }} align='left'
                                        >JobTitle</TableCell>
                                        <TableCell sx={{ fontSize: '1.2rem' }} align='left'
                                        >Roles</TableCell>
                                        {/* <TableCell sx={{ fontSize: '1.2rem' }} align='left'
                                        >Active</TableCell> */}
                                        <TableCell sx={{ fontSize: '1.2rem' }} align='left'
                                        >Status</TableCell>
                                        {(UserRoles?.includes(roles.admin) || UserRoles?.includes(roles.manager)) ?
                                            <TableCell sx={{ fontSize: '1.2rem' }} align='center'>Actions</TableCell> : null}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {empsData?.map((emp, id) => (
                                        <EmpRow key={id} empData={emp} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>


                    <AddModal showAdd={showAdd}
                        setShowAdd={setshowAdd} />



                    {/* 
                    <DataGrid 
                loading={isLoading}
                rows={Employees}
                columns={colums}
                getRowId={row => row._id}
                rowsPerPageOptions={[2, 5, 10]}
                pageSize={pageSize}
                onPageSizeChange={newPageSize=>setpageSize(newPageSize)}
                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible? 0 : 5
                })}
                onCellEditCommit={params=>setrowId(params.id)}
                sx={{
                    color: '#333',
                    bgcolor: '#fff'
                }}
                 sx={{
                     [`& .${gridClasses.row}`]: {
                         bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[100],
                         color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#fff'
                 } }}
            /> */}
                </>
            }

        </Box>
    );
}

export default Employees;
