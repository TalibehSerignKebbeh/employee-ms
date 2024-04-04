import React, { useState } from 'react'
import TableCell from '@mui/material/TableCell'
import Stack from '@mui/material/Stack'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import { roles } from '../../../config/Roles'
import EditModal from './ActionFiles/EditModal'
import DeleteModal from './ActionFiles/DeleteModal'
import { useUpdateEmployeeMutation } from '../../../features/Employee/EmployeeApiSlice'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import UseAuth from '../../../hooks/UseAuth'

export default function EmpRow({ empData }) {
    // const { refetch } = useGetEmployeesQuery()
    const [employee, setemployee] = useState({
        ...empData,
        dob: empData?.dob?.length? format(parseISO(empData?.dob), 'yyyy-MM-dd') : '',
    });
    const [showDelete, setshowDelete] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);
    const {roles:UserRoles} = UseAuth()
   const [UpdateEmp,
        { isLoading: isUpdating,
            // isSuccess: updateSucess,
            // isError: isUpdateError,
            error: updateError,

        }]
        = useUpdateEmployeeMutation()

    const acceptEmployee = async (emp) => {
        await UpdateEmp({ ...emp, active: !emp?.active }).unwrap()
            .then(res => {
                console.log(res);
                // refetch()
                console.log(res?.message);
            }).catch(error => {
                console.log(error);
            })
    }
 


   
    const handleStartDelete = (emp) => {
        // setEmpToDelete(emp)
        setshowDelete(true)
    }
    const handleShowEditModal = () => {
        // setEmpToEdit(emp)
        setshowEditModal(true)
    }
   

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell sx={{fontSize:'.8rem',}}
            align='left'>{employee?.fullName}</TableCell>
            <TableCell sx={{fontSize:'.8rem',}}
            align='left'>{employee?.username}</TableCell>
            <TableCell sx={{fontSize:'.8rem',}}
            align='left'>{employee?.telephone}</TableCell>
            <TableCell sx={{fontSize:'.8rem',}}
            align='left'>{employee?.email}</TableCell>
            {/* <TableCell sx={{color: colors.grey[100]}}>{employee?.address}</TableCell> */}
            <TableCell sx={{fontSize:'.8rem',}}
            align='left'>{employee?.jobTitle}</TableCell>
            <TableCell sx={{fontSize:'.8rem',}}
            align='left'>{employee?.roles?.toString()}</TableCell>
            <TableCell
                align='left'
            >
                <p className=' '>
                <span className={` bg-green-400
                 text-white px-2 py-[4px] rounded`}
                >{`${employee?.status}`}
                    </span> 
                    {employee?.current_leave ?
                        <span className='bg-orange-600 
                        text-white px-2 py-[4px] mt-[2px] rounded'>
                            onleave
                            {employee?.current_leave?.from?.toString()}
                        </span>
                        : null
                    }
                
                    </p>
                {/* {employee?.current_leave ?
                    <span className={`bg-green-400 rounded-md 
                 "text-white" px-3 py-2 `}
                    >
                        onLeave
                    </span> : null} */}
            </TableCell>
             {/* <TableCell
            align='left'>
                <span className={`bg-green-400 rounded-md 
                ${employee?.deleted ? "text-red-700" :
                        employee?.onLeave ? 'text-gray-700' :
                            "text-white"} px-3 py-2 `}
                >{employee?.deleted ? "deleted" :
                        employee?.onLeave ? 'onleave' : "current"
                    }
                </span>
            </TableCell> */}
            {(UserRoles?.includes(roles.admin)
                || UserRoles?.includes(roles.manager))
                ? <TableCell align='left'>
                    <Stack spacing={0.3} direction="row">
                        <Button color='success' sx={{ fontSize: '.6rem' }} variant="contained"
                            size='small'
                            onClick={() => handleShowEditModal(employee)}
                        >
                            edit
                        </Button>
                        {!employee?.status==='active'? <Button color='success'
                            sx={{ fontSize: '.6rem' }} variant="contained"
                            size='small' onClick={() => acceptEmployee(employee)}>
                            {isUpdating ? 'updating ...' : 'activated'}
                        </Button> : null}
                        {/* <Button color='warning' sx={{ fontSize: '.6rem' }}
                            variant="contained"
                            onClick={() => handleStartDelete(employee)}
                        >
                            {employee?.status==='deleted' ? "Undelete" : "delete"}
                        </Button> */}
                    </Stack>
                </TableCell> : null
            }

            <EditModal 
                empData={empData}
                employee={employee}
                setemployee={setemployee}
                setshowEditModal={setshowEditModal}
                showEditModal={showEditModal}

            />
            <DeleteModal 
                showDelete={showDelete}
                setshowDelete={setshowDelete}
                employee={employee}
           />
           
        </TableRow>
    )
}
