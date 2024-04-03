import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import { useGetLeavesQuery } from '../../../features/Leaves/leaveApiSice';
import { tokens } from '../../../theme'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'
import EmptyData from '../../../components/EmptyData';
import Loaddder from '../../../components/Loaddder';
import LeaveRow from './LeaveRow';
import Leave from './Leave';
import PaginateComp from '../../../components/Pagination/Pagination';
import UseAuth from '../../../hooks/UseAuth';

const LeavesList = ({ selected, setSelected }) => {

    const { isAdmin } = UseAuth()
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'
    const colors = tokens(theme.palette.mode)
    const [openAdd, setopenAdd] = useState(false);
    const [page, setpage] = useState(0);
    let pageSize = 5;

    const { data: leavesData, isLoading,
        isSuccess, isError, error } = useGetLeavesQuery(page, pageSize)

    useEffect(() => {
        setSelected("leaves")
    }, [setSelected]);

    return (
        <Box maxWidth={'auto'} width="100%" margin="auto" py={3}  >
            {isLoading ? <Loaddder />
                : isSuccess ?
                    <div>
                        <h3 className={`${(isDark) ? 'text-white' : 'text-gray-800'} 
                             px-3 text-start min-w-full w-full 
                             my-4 mt-8 after:block after:p-0
                             after:m-auto after:w-full after:h-px
                             after:bg-red-400 `}
                        >
                            Todos Page
                        </h3>
                        <div className={`my-3 rounded-lg `}>
                            <div className='flex justify-end'>
                                <button
                                    className={`px-4 py-2 rounded-md bg-teal-600 m-2 mx-4
                                    text-sm uppercase text-white`}
                                    onClick={e => setopenAdd(prev => !prev)}
                                > Apply Leave
                                </button>
                            </div>
                            <Collapse in={openAdd}>
                                <div className={`${isDark ? 'bg-slate-700' : 'bg-slate-200'}
                                    py-5 rounded-xl
                                    md:mx-5 sm:mx-2 mx-[1px]`}>
                                    <Leave />
                                </div>
                            </Collapse>
                        </div>
                        {leavesData?.leaves?.length ?
                            <TableContainer component={Paper}
                            sx={{
                                width: "100%", mt: 2,
                                ml: { xl: 4, lg: 3, md: 2, sm: 0, xs: 0 },
                                mr: { xl: 4, lg: 3, md: 2, sm: 0, xs: 0 },
                                bgcolor: isDark ? "#1F2937" : '#fff'
                            }}
                            className={`${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                            <Typography
                                sx={{
                                    color: `${colors.grey[100]}`,
                                    textAlign: {xxl:'center',xl:'center',lg:'center',md:'center',sm:'start',xs:'start'},
                                    marginX: 'auto',
                                    fontSize: 'large', paddingY: 2,px:2
                                }}
                            >{isAdmin? 'All Leaves' :'My Leaves'}</Typography>

                            <Table >
                                <TableHead >
                                    <TableRow >
                                        <TableCell sx={{
                                            fontSize: '1.1rem', fontWeight: '300'
                                        }} className='text-xl'>
                                            Owner
                                        </TableCell>
                                        <TableCell sx={{
                                            fontSize: '1.1rem', fontWeight: '300'
                                        }} className='text-xl'>
                                            From
                                        </TableCell>
                                        <TableCell sx={{
                                            fontSize: '1.1rem', fontWeight: '300'
                                        }} className='text-xl'>
                                            To
                                        </TableCell>
                                        <TableCell sx={{
                                            fontSize: '1.1rem', fontWeight: '300'
                                        }} className='text-xl'>
                                            Category
                                        </TableCell>
                                        <TableCell sx={{
                                            fontSize: '1.1rem', fontWeight: '300'
                                        }} className='text-xl'>
                                            AddedBy 
                                        </TableCell>
                                        <TableCell sx={{
                                            fontSize: '1.1rem', fontWeight: '300'
                                        }} className='text-xl'>
                                            Status
                                        </TableCell>
                                        {isAdmin ?
                                            <TableCell sx={{
                                                fontSize: '1.1rem', fontWeight: '300'
                                            }} className='text-xl'>
                                                Actions
                                            </TableCell> : null}
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {leavesData?.leaves?.map((leave, index) => (
                                        <LeaveRow leave={leave}
                                            key={index}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> : null}
                        {leavesData?.leaves?.length ?
                        <div className='w-full flex justify-center text-center mx-auto
                                my-3'>
                            <PaginateComp
                                page={page} setpage={setpage}
                                total={leavesData?.total}
                                pageSize={pageSize}
                            />
                        </div>: null}
                        {!leavesData?.leaves?.length ?
                          <EmptyData name={'Leaves'}/>
                        : null}
                    </div>
                    : !isError ? <EmptyData name={"Leave"} />
                        :
                        <div className='w-fit py-3 px-2
                        bg-red-400 rounded-md
                        md:mx-16 sm:mx-8 mx-1'
                        >
                            <h4 className='text-slate-900'>!opps an error occurred</h4>
                            <p className='text-sm font-semibold text-slate-900'>
                                {!error?.originalStatus ?
                                    'no response from api server' :
                                    (error?.originalStatus === 500) ?
                                        'Internal server error' :
                                        error?.data?.message}</p>
                        </div>

            }
        </Box>
    );
}

export default LeavesList;
