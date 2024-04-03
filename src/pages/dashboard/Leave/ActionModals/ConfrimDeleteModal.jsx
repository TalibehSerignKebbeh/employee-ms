import React from 'react';
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalHeader from 'react-bootstrap/ModalHeader'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles';
import { useDeleteLEaveMutation } from '../../../../features/Leaves/leaveApiSice';
import  WarnIcon  from '@mui/icons-material/WarningOutlined';

const ConfrimDeleteModal = ({
    leave,
    showModal, 
        handleCloseDeleteModal,
}) => {

    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark';

    const [deleteLeave, { isLoading: deleting,
        data: deleteData, isError, error,
        isSuccess: deleteSuccess,
    }] = useDeleteLEaveMutation()

    const DeleteLeaveFunction = async () => {
        await deleteLeave(leave).unwrap()
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                
            })
    }

   
    return (
        <Modal id="myModal" className='modal fade' show={showModal}
            centered={true} data-bs-backdrop="static" data-bs-keyboard="false"
            onHide={() => {
                if (deleting) return;
                handleCloseDeleteModal()
            }}

            onEscapeKeyDown={e => e.preventDefault()}
        >
            <ModalHeader closeButton closeLabel=''
                className={`${isDark ? 'bg-slate-600' : 'bg-slate-50'}`}
            >
                {/* {modalHeaderContent} */}
                <Typography sx={{ fontSize: '1.3rem', color:isDark?'#fff': '#2F4F4F', }}>
                    Delete Leave Permanently
                </Typography>
            </ModalHeader>
            <ModalBody
                className={`${isDark ? 'bg-slate-600' : 'bg-slate-50'}`}
            >

                {(!deleteSuccess && !isError) ?
                    <div>
                        <h4 className={` text-lg
                        ${isDark ? 'text-white':'text-black'}`}>
                        Are you sure you want to delete this leave
                        </h4>
                        <p
                            className='text-red-500 text-lg
                            '>
                            <WarnIcon sx={{
                                color: 'red', transform: 'scale(1.5)',
                            mr:'15px', mt:'-7px', ml:'3px'}} />
                            you can't undo this action
                        </p>
                    </div> : null}
                {isError ?
                    <p className='text-red-700 text-lg px-1 py-2
                    bg-slate-200 shadow-md rounded'>
                        {!error?.status ? 'no server response' :
                            (error?.status === 500 || error?.originalStatus === 500) ?
                                'internal server error' :
                                error?.data?.message}
                    </p> : null
                }
                {deleteSuccess ?
                    <p className='text-green-700 text-lg
                    bg-slate-200 shadow-md rounded px-1 py-2'>
                        {deleteData?.message}
                    </p> : null}
            </ModalBody>
            <ModalFooter
                style={{backgroundColor:`${isDark? '#475569':'#fff'}`} }
            >
                        <Button disabled={deleting}
                            sx={{
                                bgcolor: '#B91C1C',
                                ':hover': { bgcolor: '#EF4444' },
                                marginRight: 1,px:4,py:1,
                                color: 'white'
                            }}
                            onClick={() => DeleteLeaveFunction()}>
                            {deleting? <p><CircularProgress /> deleting</p> : 'Delete'}
                        </Button>
                       
                        <Button disabled={deleting}
                                sx={{
                                    border: '1px solid black',
                                    bgcolor: 'white',
                                    ':hover': { bgcolor: 'white' },
                                    color: 'black', px:4,py:1
                                }} color="warning"
                                onClick={() => handleCloseDeleteModal()}>
                                Close
                        </Button>

            </ModalFooter>
        </Modal>
    );
}

export default ConfrimDeleteModal;
