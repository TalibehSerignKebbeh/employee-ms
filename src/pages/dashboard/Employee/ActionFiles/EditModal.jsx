import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useUpdateEmployeeMutation } from '../../../../features/Employee/EmployeeApiSlice';
import { useTheme } from '@mui/material/styles';
import CloseOutlined from '@mui/icons-material/CloseOutlined'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UpdateEmployeeSchema } from '../schemas';
import EmployeeEditForm from '../EmployeeEditForm';
import SuccessComponent from '../../../../components/RequestStatus/SuccessComponent';


const EditModal = ({ showEditModal, setshowEditModal, 
    employee, setemployee, empData
}) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!#@$&*?]).{5,}$/;
       
       const theme = useTheme()
    const isDark = theme.palette.mode === 'dark';

     const [UpdateEmp,
        { isLoading: isUpdating,
            error: updateError, isError,
            reset:ResetUpdate,isSuccess,data:response

        }]
        = useUpdateEmployeeMutation()
    
     const { handleSubmit, register,
         getValues, reset: resetForm,
        setError, 
        formState: { errors,defaultValues, }
    } = useForm({
        resolver: yupResolver(UpdateEmployeeSchema),
        defaultValues: employee,
        reValidateMode: "onChange",
    })
    
    const UpdateEmployee = async (data) => {
        if (data.password?.length) { 
            if (passwordRegex.test(data?.password)) {
                setError('password', {
                    message: 'Password must contain at least one lowercase letter, one uppercase letter, and one of the following special characters: !#@$&*?',
                },{shouldFocus:true})
            }
            if (!data?.password !== data?.confirm_password) {
                setError('confirm_password', {message:'passwords must match',},{shouldFocus:true})
            }
            
        } else {
            
        const employeeData = { ...data, roles: employee?.roles }
        await UpdateEmp(employeeData).unwrap()
            .then(res => {
                console.log(res);
                // refetch()
            }).catch(err => {
                console.log(err);
                console.log(updateError);
            })
        }

    }

        const handleCloseEditModal = () => {
        setshowEditModal(false)
            setemployee(empData)
            // return UpdateEmp?.abort()
    }

    const handleReset = () => {
         setemployee({ ...defaultValues })
        resetForm(employee, {keepDefaultValues:true})
        
    }
    
    useEffect(() => {
        if (!employee?.password && !employee.confirm_password) {
                setemployee({...employee,password:'', confirm_password:'' })
        }
        return () => {
            
        };
    }, []);
    
    return (
        <Modal size='lg' id="edit_modal" className='edit-modal'
                show={showEditModal}
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
                        fontSize: '1.3rem', marginX: 2, display:'block'
                    }}
                    className={`${isDark? 'text-white':'text-black'}`}>
                        Edit Employee
                </Typography>
                <br />
                
                
                </ModalHeader>
                <ModalBody className={`${isDark? 'bg-slate-800':'bg-white'}`}>
                    <Container className={`${isDark ? 'bg-slate-600' : 'bg-slate-50'}
                    py-3 md:rounded-md rounded-sm`}>
                    {isError ?
                    <div className='flex flex-row w-auto md:min-w-[450px] 
                    sm:min-w-[300px] min-w-full max-w-[600px] justify-between
                        items-center bg-slate-300 py-2 md:px-4 sm:px-2 px-1
                        rounded-md min-h-[50px] max-h-[80px]'>
                        <p className={`text-red-500  my-0 text-center text-xl`}>
                                {!updateError?.originalStatus ? 'no response form backend server'
                                   : updateError?.originalStatus === 500 ?
                                    "internal server error" : updateError?.message}
                        </p>
                        <button onClick={() => ResetUpdate()} type=''
                            className='bg-inherit  
                            text-red-400  text-3xl 
                             hover:bg-white
                            w-12 h-12 rounded-[50%]'>
                            <CloseOutlined />
                        </button>

                    </div> : null}
                   
                    {isSuccess ?
                        <SuccessComponent message={response?.message}
                            ResetFunc={() => {
                                ResetUpdate()
                            }}
                        />
                        : <EmployeeEditForm
                        setemployee={setemployee}
                        employee={employee}
                        submitDataFunction={handleSubmit(UpdateEmployee)}
                        isLoading={isUpdating}
                        errors={errors}
                        getValues={getValues}
                        register={register}
                        handleReset={handleReset}
                        isDark={isDark}
                    />}
                    </Container>
                     
                </ModalBody>
             </Modal>
    );
}

export default EditModal;
