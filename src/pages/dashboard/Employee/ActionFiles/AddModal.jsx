import React, {  } from 'react';
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles';
import ErrorBoundary from '../../../../ErrorBoundary'
import EmployeeForm from '../EmployeeForm';


const AddModal = ({ showAdd, setShowAdd }) => {
    
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark';


    const handleCloseEditModal = () => {
        setShowAdd(false)
    }
  
    return (
        <ErrorBoundary>
            <Modal size='lg' id="edit_modal" className='edit-modal'
                show={showAdd}
                centered data-bs-backdrop="static"
                data-bs-keyboad='false'
                onHide={handleCloseEditModal}
                fullscreen='xxl-down'

            >
                <ModalHeader closeButton closeLabel='close'
                    className={`${isDark ? 'bg-slate-600' : 'bg-slate-50'}`}
                >

                    <Typography component={'h4'} sx={{
                        marginBottom: 1, fontWeight: 'bold',
                        fontSize: '1.3rem', marginX: 2, display: 'block'
                    }}
                        className={`${isDark ? 'text-white' : 'text-black'}`}>
                        Add Employee
                    </Typography>
                    <br />
                    {/* {isError ?
                        <div className='flex flex-row w-auto md:min-w-[450px] 
                    sm:min-w-[300px] min-w-full max-w-[600px] justify-between
                        items-center bg-slate-400 md:px-4 sm:px-2 px-1
                        rounded-md min-h-[50px] max-h-[80px]'>
                            <p className={`text-red-500  my-0 text-center text-xl`}>
                                {!error?.status ? 'no response form backend server'
                                    : error?.status === 500 ?
                                        "internal server error"
                                        :
                                        error?.data?.message}
                            </p>
                            <button onClick={() => reset()} type=''
                                className='bg-inherit  
                            text-red-400  text-3xl 
                             hover:bg-white
                            w-12 h-12 rounded-[50%]'>
                                <CloseOutlined />
                            </button>

                        </div> : null}
                    {isSuccess ?
                        <div className='flex flex-row w-auto md:min-w-[450px] 
                    sm:min-w-[300px] min-w-full max-w-[600px] justify-between 
                        items-center bg-slate-400 md:px-4 sm:px-2 px-1
                        rounded-md min-h-[50px] max-h-[80px]'>
                            <p className={`text-green-400  my-0 text-center text-xl`}>
                                {response?.message}
                            </p>
                            <button onClick={() => reset()} type=''
                                className='bg-inherit 
                            text-red-400  text-3xl 
                             hover:bg-white
                            w-12 h-12 rounded-full'>
                                <CloseOutlined />
                            </button>
                        </div>
                        : null} */}
                </ModalHeader>
                <ModalBody className={`${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <div className={`${isDark ? 'bg-slate-600' : 'bg-slate-50'}
                    py-3 md:rounded-md rounded-sm`}>
                        <EmployeeForm isDark={isDark} />
                    </div>

                </ModalBody>


               
            </Modal>
        </ErrorBoundary>
    );
}

export default AddModal;
