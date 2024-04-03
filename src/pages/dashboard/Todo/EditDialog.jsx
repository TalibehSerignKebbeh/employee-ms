import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle';
import { useUpdateTodoMutation } from '../../../features/Todo/todoApiSlice';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import EditForm from './EditForm';
import SuccessComponent from '../../../components/RequestStatus/SuccessComponent';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />
})


const EditDialog = ({ openEdit, setOpenEdit, todo, employees,}) => {

    const [Todo, setTodo] = useState({
        ...todo,
        collabs: todo?.collabs?.map(per => per?.username)
    });
    const [UpdateTodo,
        { isLoading, isError, error, reset, isSuccess,
            data: successData, }] = useUpdateTodoMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newCollabs = employees?.map((emp) => {
            if (Todo?.collabs?.indexOf(emp?.username) !== -1) {
                return emp?._id;
            }
            return undefined;
        }).filter((value) => value !== undefined);

        await UpdateTodo({ ...Todo, collabs:newCollabs }).unwrap()
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                // useGetTodosQuery?.refetch()
                // store.getState().api.queries.
            })

    }
    const handleClose = () => {
        if (isLoading) return;
        setOpenEdit(false)
    }
    return (
        <Dialog open={openEdit}
            TransitionComponent={Transition}
            disableEscapeKeyDown
            sx={{
                p: { xl: 2, lg: 2, md: 2, sm: '1px', xs: '0px' },
                m: 0,
            }}
            onClose={handleClose}
        >
           
            <DialogTitle 
                sx={{
                    fontSize: '1.2rem', fontWeight: 'normal',
                    width: '100%', bgcolor: 'green',
                    color:'white'
                }}>
                {"Edit Todo"}
            </DialogTitle>
            <Box sx={{ width: '100%', height: 'auto', p: 2 }}>
                {isError ?
                    <div className='flex flex-row w-auto  justify-between
                        items-center bg-slate-400 md:px-4 sm:px-2 px-1'>
                        <p className={`text-red-500  my-0 text-center text-xl`}>
                            {error?.message || "internal server error"}
                        </p>
                        <button onClick={() => reset()} type=''
                            className='bg-transparent w-auto h-auto 
                            text-red-400  text-3xl bg-white
                             hover:bg-slate-50
                            p-[10px] rounded-full'>
                            <CloseOutlined />
                        </button>

                    </div> : null}
                {isSuccess ?
                    <SuccessComponent
                        message={successData?.message}
                        ResetFunc={() => { reset() }}
                    />
                    :
                    <EditForm todo={Todo}
                        setTodo={setTodo}
                        employees={employees}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        handleClose={handleClose}
                    />
                }
            </Box>

        </Dialog>
    );
}

export default EditDialog;
