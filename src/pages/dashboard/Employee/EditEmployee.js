import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetEmployeesQuery, useUpdateEmployeeMutation } from '../../../features/Employee/EmployeeApiSlice';
// import Roles from '../../../config/Roles';
import './EditForm.css'


const EditEmployee = ({selected, setSelected}) => {
    const { employeeId } = useParams();
    const [employeeToEdit, setemployeeToEdit] = useState(null);
    // console.log(employeeId);
        const { data: empsData, isLoading: empLoading, isSuccess: empSucess, isError: isEmpError, error: empError } = useGetEmployeesQuery()
    // const { employee } = useGetEmployeesQuery('employees', {
    //     selectFromResult: ({ data }) => ({
    //         employee: data?.entities[employeeId]
    //     })
    // })
    const [updateEmployee, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateEmployeeMutation()
    useEffect(() => {
        // setSelected("edit")
        if (empSucess) {
            const emp = empsData?.find(emp => emp._id === employeeId)
            setemployeeToEdit(emp)
       }
    }, [empSucess, employeeId, empsData])
    const handleRolesChange = (e) => {
        const value = e.target.options[e.target.selectedIndex].value
        if (employeeToEdit.roles.includes(value)) {
            const newRoles = employeeToEdit.roles.filter(role => role !== value);
            setemployeeToEdit({ ...employeeToEdit, roles: newRoles })
        } else {
            setemployeeToEdit({ ...employeeToEdit, roles: [...employeeToEdit.roles, value] })
        }
    }
    const UpdateEmployee = async (e) => {
        e.preventDefault();
        console.log(employeeToEdit);
        await updateEmployee(employeeToEdit).unwrap()
            .then(res => {
                console.log(res);
                console.log('Update success');
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div>{
            empLoading ? <CircularProgress /> :
                <form className='edit-employee-form' onSubmit={UpdateEmployee}>
                    {isSuccess && <p>Edit Success</p>}
                    {isError && <p>{ error?.data}</p>}
                    <div className='wrapper'>
                        <div className='input-wrapper'>
                            <label htmlFor='fisrtname'>First Name</label>
                            <input type={'text'} value={employeeToEdit?.firstName || ' '}
                                onChange={(e) => setemployeeToEdit({ ...employeeToEdit, firstName: e.target.value })}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor='fisrtname'>Middle Name</label>
                            <input type={'text'} value={employeeToEdit?.middleName || ' '}
                                onChange={(e) => setemployeeToEdit({ ...employeeToEdit, middleName: e.target.value })}
                            />
                        </div><div className='input-wrapper'>
                            <label htmlFor='fisrtname'>Last Name</label>
                            <input type={'text'} value={employeeToEdit?.lastName}
                                onChange={(e) => setemployeeToEdit({ ...employeeToEdit, lastName: e.target.value })}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor='fisrtname'>Username</label>
                            <input type={'text'} value={employeeToEdit?.username || ' '}
                                onChange={(e) => setemployeeToEdit({ ...employeeToEdit, username: e.target.value })}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor='fisrtname'>Dob</label>
                            <input type={'date'} value={employeeToEdit?.dob || ''}
                                onChange={(e) => setemployeeToEdit({ ...employeeToEdit, dob: e.target.value })}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor='fisrtname'>Telephone</label>
                            <input type={'text'} value={employeeToEdit?.telephone || ' '}
                                onChange={(e) => setemployeeToEdit({ ...employeeToEdit, telephone: e.target.value })}
                            />
                        </div><div className='input-wrapper'>
                            <label htmlFor='fisrtname'>Email</label>
                            <input type={'text'} value={employeeToEdit?.email || ' '}
                                onChange={(e) => setemployeeToEdit({ ...employeeToEdit, email: e.target.value })}
                            />
                        </div><div className='input-wrapper'>
                            <label htmlFor='fisrtname'>JobTitle</label>
                            <input type={'text'} value={employeeToEdit?.jobTitle || ' '}
                                onChange={(e) => setemployeeToEdit({ ...employeeToEdit, jobTitle: e.target.value })}
                            />
                        </div><div className='input-wrapper'>
                            <label htmlFor='fisrtname'>Salary</label>
                            <input type={'text'} value={employeeToEdit?.salary || ' '}
                                onChange={(e) => setemployeeToEdit({ ...employeeToEdit, salary: e.target.value })}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor='fisrtname'>Address</label>
                            <input type={'text'} value={employeeToEdit?.address || ' '}
                                onChange={(e) => setemployeeToEdit({ ...employeeToEdit, address: e.target.value })}
                            />
                        </div>
                        {/* <div className='input-wrapper'>
                            <label htmlFor='password'>Password</label>
                            <input type={'password'} value={employeeToEdit?.password}
                                onChange={(e) => setemployeeToEdit({ ...employeeToEdit, password: e.target.value })}
                            />
                        </div> */}
                        <div className='input-wrapper'>
                            <label htmlFor='roles'>Roles</label>
                            <select value={employeeToEdit?.roles}
                                multiple={true}
                                onChange={e => handleRolesChange}
                                id='roles'
                            >
                                <option value={'admin '} >Admin</option>
                                <option value={'manager '} >Manager</option>
                                <option value={'CEO '} >CEO</option>
                                <option value={'editor '} >editor</option>
                            </select>

                        </div>
                        <div className='sub-wrapper'>
                            <div className='sub-input-container'>
                                <label htmlFor='active'>Active</label>
                                <input type={'checkbox'} value={employeeToEdit?.active || false}
                                    onChange={(e) => setemployeeToEdit({ ...employeeToEdit, active: !employeeToEdit.active })} id='active'
                                />
                            </div>
                            <div className='sub-input-container'>
                                <label htmlFor='retired'>Retired</label>
                                <input type={'checkbox'} value={employeeToEdit?.retired || false}
                                    onChange={(e) => setemployeeToEdit({ ...employeeToEdit, retired: !employeeToEdit.retired })} id='retired'
                                />
                            </div>
                            <div className='sub-input-container'>
                                <label htmlFor='leave'>OnLeave</label>
                                <input type={'checkbox'} value={employeeToEdit?.OnLeave || false}
                                    onChange={(e) => setemployeeToEdit({ ...employeeToEdit, OnLeave: !employeeToEdit?.OnLeave })} id='laeve'
                                />
                            </div>
                        </div>
                    </div>{
                        isLoading ? <button type='submit'><CircularProgress /></button>
                            :
                    <button type='submit' className='submit-btn'>Update</button>
                    }
                </form>
        }

        </div>
    );
}

export default EditEmployee;
