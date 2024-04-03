import React from 'react';
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material';
import { tokens } from '../../../../theme';
import { useDeleteEmployeeMutation } from '../../../../features/Employee/EmployeeApiSlice';


const DeleteModal = ({showDelete,setshowDelete, employee}) => {

    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark';
    const colors = tokens(theme.palette.mode)

     const [DeleteEmployee,
        { isLoading: isDeleting, isSuccess: deleteSuccess,
            // isError: isDeleteError,
            error: deleteError }]
        = useDeleteEmployeeMutation();
     const DeleteEmp = async () => {
        await DeleteEmployee({ id: employee._id }).unwrap()
            .then(res => {
                console.log(res);
                // refetch()
            })
            .catch(err => {
                console.log(err);
            })
    }

     const handleCloseDeleteModal = () => {
        // setEmpToDelete(null)
        setshowDelete(false)
        return DeleteEmployee().abort()

    }
    return (
         <Modal id="delete_model" className='modal fade'
                show={showDelete}
                centered={true} data-bs-backdrop="static"
                // data-bs-keyboard="false"
                onEscapeKeyDown={e=>e.preventDefault()}
                onHide={handleCloseDeleteModal}
            >
                <ModalHeader closeButton closeLabel=''
                 className={`${isDark ? 'bg-slate-600' : 'bg-slate-50'}`}>
                    <Typography sx={{
                        fontSize: '1.3rem',
                    // color: colors.primary[100]
                }}>
                        Delete Employee
                    </Typography>
                </ModalHeader>
                <ModalBody
                 className={`${isDark ? 'bg-slate-600' : 'bg-slate-50'}`}>
                    {!deleteSuccess ?
                        <Typography component={'h2'}
                            sx={{
                                fontSize: '1.3rem',
                                // color: colors.grey[100]
                            }}>
                        Are you sure you want to delete <span
                            className='text-xl text-red-500
                            underline'>{employee?.username}</span>
                        </Typography>
                        : deleteError ?
                            <p className={`my-1 text-red-500 px-auto w-fit
                            p-1 bg-slate-200 rounded`}>
                                {deleteError?.status === 500 ? 'internal server error'
                                    : deleteError?.data?.message}
                               
                            </p> :
                            <h4 className='text-green-700 text-lg
                            p-1 bg-slate-200 rounded w-fit'>
                                {/* {deleteSuccessMsg} */}
                                success message
                            </h4>
                    }
                </ModalBody>
                <ModalFooter
                 style={{backgroundColor:`${isDark? '#475569':'#fff'}`} }>
                    {isDeleting ? <CircularProgress /> :
                        !deleteSuccess ? <>
                            <Button sx={{px:3,py:1,
                                marginRight: 1, color: 'white', bgcolor: '#FF0000',
                            ':hover':{bgcolor: '#FF0000', opacity:.75}}}
                                className='bg-red-700'
                                onClick={() => DeleteEmp()}>Delete
                            </Button>
                        <Button sx={{
                                ml:3,px:3,py:1,
                                backgroundColor: 'lightgray',
                                ':hover':{bgcolor:'lightgray'}, color: 'white'
                            }} color="warning"
                                onClick={() => handleCloseDeleteModal()}>Close
                            </Button>
                        </> :
                        <Button
                            variant='outlined'
                            color='warning'
                            sx={{px:3,py:1, ml:3}}
                            onClick={() => handleCloseDeleteModal()}
                            >Cancell</Button>
                    }
                </ModalFooter>
            </Modal>
    );
}

export default DeleteModal;
