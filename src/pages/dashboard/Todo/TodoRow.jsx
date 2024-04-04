import React, { useState } from 'react'
import format from 'date-fns/format'
import toDate from 'date-fns/toDate'
import parseISO from 'date-fns/parseISO'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalHeader from 'react-bootstrap/ModalHeader'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import CompleteIcon from '@mui/icons-material/DoneOutline'
import PendingIcon from '@mui/icons-material/Pending'
import { useTheme } from '@mui/material/styles'
import { useDeleteTodoMutation } from '../../../features/Todo/todoApiSlice'
import CollabsTable from './CollabsTable'
import { Link } from 'react-router-dom'
import EditDialog from './EditDialog'




export default function TodoRow({ todo, employees, refetchTodo }) {

    console.log(todo);
    const isLight = useTheme().palette.mode === 'light'

    let id = todo?._id
    const [openCollabs, setopenCollabs] = useState(false);
    const [openEdit, setopenEdit] = useState(false);
    const [showTodoDeleteModal, setshowTodoDeleteModal] = useState(false);
    const [deleteTodo, { isLoading: deleteLoading,
        isSuccess: deleteSuccess, data: deleteData, reset,
        error: deleteError, }]
        = useDeleteTodoMutation(id)
   

    const handleCloseDeleteModal = () => {
        setshowTodoDeleteModal(false)
        //  settodoToDelete(null)
        reset()
    }

   
    const hanleDelete = async () => {
        await deleteTodo(id).unwrap()
            .then(res => {
                console.log(deleteData);
                console.log(res);
            }).catch(err => {
                console.log(deleteError);
                console.log(err);
            })
    }

    

    return (
        <React.Fragment>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: '#fff' }}>
                <TableCell align='center' >
                    <button className='px-2 py-1'
                         onClick={e => setopenCollabs(prev => !prev)}>
                    <ArrowUpward
                            sx={{
                                transform: openCollabs ?
                                    'rotate(0deg)' : 'rotate(180deg)'
                            }}
                    />
                    </button>
                </TableCell>
                <TableCell align='left'
                    sx={{ fontSize: '1rem' }}>
                    {todo?.name}
                    
                </TableCell>
                
                <TableCell align='left'
                   sx={{fontSize:'1rem'}}
                >
                    {(todo?.dateLine && todo?.dateLine?.length)? format(parseISO(todo?.dateLine), 'MMMM dd yyyy') : ''}
                </TableCell>
               
                <TableCell align='left'>
                    <span
                    // ${todo?.isComplete ? 'bg-green-400' : 'bg-inherit'}
                        className={`p-[3px] text-[15px] rounded-md
                    `}>
                        {todo?.isComplete ? <CompleteIcon 
                            sx={{color:'lightgreen',transform:'scale(1.4)'}}
                        /> : <PendingIcon sx={{transform:'scale(1.4)'}} />}
                    </span>
                </TableCell>
                 <TableCell align='center' colSpan={7}>
                     <Button  color='success' variant='outlined'
                                onClick={() => {setopenEdit(prev=>!prev)}}
                            >
                                Edit
                            </Button>
                </TableCell>
                
                <Modal id="myModal" className='modal fade' show={showTodoDeleteModal}
                    centered={true} data-bs-backdrop="static" data-bs-keyboard="false"
                    onHide={handleCloseDeleteModal}

                >
                    <ModalHeader closeButton closeLabel=''>
                        <Typography sx={{ fontSize: '1.3rem', color: '#2F4F4F' }}>
                            Delete Todo
                        </Typography>
                    </ModalHeader>
                    <ModalBody>
                        {!deleteSuccess ?
                            <h4 className='delete-message'>Are you sure you want to delete
                                <span className='text-lg text-red-500'>{todo?.name}</span></h4>
                            : deleteError ? <p>{deleteError?.data?.message}</p> :
                                <h4>{deleteData?.message}</h4>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {deleteLoading ? <CircularProgress /> :
                            <>

                                <Button
                                    sx={{
                                        backgroundColor: '#FF00FF',
                                        marginRight: 1,
                                        color: 'white'
                                    }}
                                    onClick={() => hanleDelete()}>Delete
                                </Button>
                                <Button
                                    sx={{
                                        backgroundColor: '#98FB98',
                                        color: 'white'
                                    }} color="warning"
                                    onClick={() => handleCloseDeleteModal()}>Cancell
                                </Button>
                            </>
                        }
                    </ModalFooter>
                </Modal>
                
                <EditDialog openEdit={openEdit}
                    setOpenEdit={setopenEdit}
                    todo={todo} employees={employees}
                    refetchTodo={refetchTodo}
                />
              
            </TableRow>
            
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}>
                    <Collapse in={openCollabs} timeout="auto" unmountOnExit>
                        <Box sx={{
                            bgcolor: isLight ? '#fff' : '#25282b', py: 3, px: 1,
                            margin: { xl: 1, lg: 1, md: 1, sm: 0, xs: 0 },
                            borderRadius: '5px',
                            
                        }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'row',
                                flexWrap: 'wrap', columnGap: '30px',
                               rowGap:'18px',
                            }}>
                                <Box  sx={{display:'flex', rowGap:'1px', flexDirection:'column',
                                justifyContent:'flex-start', alignItems:'baseline'}}>
                                    <h4 className={`text-[10px] `}>Created Date</h4>
                                    <h2 className={`text-sm font-normal -mt-2`}>
                                      {format(toDate(parseISO(todo?.createdAt)), 'MMMM dd yyyy')}
                                    </h2>
                                </Box>
                                <Box sx={{display:'flex', rowGap:'1px', flexDirection:'column',
                                justifyContent:'flex-start', alignItems:'baseline'}}>
                                    <h4 className={`text-[10px] font-light`}>Created By</h4>
                                    <h2 className={`text-sm font-normal -mt-2`}>
                                      {`${todo?.createdBy?.firstName} ${todo?.createdBy?.middleName} ${todo?.createdBy?.lastName} `}
                                    </h2>
                                </Box>
                                <Box sx={{display:'flex', rowGap:'1px', flexDirection:'column',
                                justifyContent:'flex-start', alignItems:'baseline'}}>
                                    <h4 className={`text-[10px] font-light`}>DeadLine</h4>
                                    <h2 className={`text-sm font-normal -mt-2`}>
                                      {format(toDate(parseISO(todo?.dateLine)), 'MMMM dd yyyy')}
                                    </h2>
                                </Box>
                            </Box>
                            <CollabsTable
                                collaborators={todo?.collabs?.length ? todo?.collabs : []} 
                                
                                />
                            {/* <StudentsTable socket={socket} exam={exam} /> */}
                        </Box>
                    {/* <EditForm data={todo} employees={ employees} /> */}

                    </Collapse>
                </TableCell>

            {/* <TableCell colSpan={7} align='right'>
                <Collapse in={openEdit} unmountOnExit
                sx={{float:'right'}}>
                    <EditForm data={todo} employees={ employees} />
                    </Collapse>
                </TableCell> */}
            </TableRow>

        </React.Fragment>
    )
}
