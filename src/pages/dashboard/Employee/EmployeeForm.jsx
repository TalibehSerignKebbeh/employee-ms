import React, { useState } from 'react';
import { AddEmployeeSchema } from './schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import EmpInputContainer from './EmpInputContainer';
import { useAddEmployeeMutation } from '../../../features/Employee/EmployeeApiSlice';
import RolesSelect from '../../../components/Select/RolesSelect';


const EmployeeForm = ({ isEdit = false, isDark = false }) => {
    const [employee, setemployee] = useState({
        username: '', firstName: '', lastName: '',
        middleName: '', roles: [], public_name: '', password: '',
        confirm_password: '',
        address: '', dob: '', jobTitle: '',
        salary: 0, telephone: '', email: '',
        gender: '', status: 'active'
    });
    const { handleSubmit, register,
        getValues, reset: resetForm,

        formState: { errors, }
    } = useForm({
        resolver: yupResolver(AddEmployeeSchema),
        defaultValues: employee,
        // values: employee,
        reValidateMode: "onChange",
    })

    const [AddEmployee, { isLoading, isError, error, reset, data: response,
        isSuccess }] = useAddEmployeeMutation()

    const SubmitData = async (data) => {

        const employeeData = { ...data, roles: employee?.roles }
        console.log(employeeData);
        await AddEmployee(employeeData).unwrap()
            .then(res => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
    }
    const handleReset = () => {
        resetForm()
        setemployee({ ...employee, roles: [] })
    }

    // const theme = useTheme()
    // const isDark = theme.palette.mode === 'dark';

    return (
        <form onSubmit={handleSubmit(SubmitData)}
            onReset={handleReset}>
            <div className='grid md:grid-cols-2 
                        sm:grid-cols-1 grid-cols-1 md:gap-x-5 sm:gap-x-2
                        md:gap-y-5 sm:gap-y-3 gap-y-2 2xl:px-5  xl:px-4 lg:px-4 md:px-3 sm:px-2 px-1'
            >
                <EmpInputContainer
                    title={'firstName'}
                    errors={errors}
                    inputTye='text'
                    registerProps={{ ...register('firstName') }}
                />
                <EmpInputContainer
                    title={'middleName'}
                    errors={errors}
                    inputTye='text'
                    registerProps={{ ...register('middleName') }}
                />
                <EmpInputContainer
                    title={'lastName'}
                    errors={errors}
                    inputTye='text'
                    registerProps={{ ...register('lastName') }}
                />
                <EmpInputContainer
                    title={'username'}
                    errors={errors}
                    inputTye='text'
                    registerProps={{ ...register('username') }}
                />
                <EmpInputContainer
                    title={'email'}
                    errors={errors}
                    inputTye='email'
                    registerProps={{ ...register('email') }}
                />
                <EmpInputContainer
                    title={'address'}
                    errors={errors}
                    inputTye='text'
                    registerProps={{ ...register('address') }}
                />
                <EmpInputContainer
                    title={'telephone'}
                    errors={errors}
                    inputTye='text'
                    registerProps={{ ...register('telephone') }}
                />
                <EmpInputContainer
                    title={'jobTitle'}
                    errors={errors}
                    inputTye='text'
                    registerProps={{ ...register('jobTitle') }}
                />
                <EmpInputContainer
                    title={'salary'}
                    errors={errors}
                    inputTye='number'
                    registerProps={{ ...register('salary') }}
                />
                <EmpInputContainer
                    title={'dob'}
                    errors={errors}
                    inputTye='date'
                    registerProps={{ ...register('dob') }}
                />

                <EmpInputContainer
                    title={'password'}
                    errors={errors}
                    inputTye='password'
                    registerProps={{ ...register('password') }}
                />
                <EmpInputContainer
                    title={'confirm_password'}
                    errors={errors}
                    inputTye='password'
                    registerProps={{ ...register('confirm_password') }}
                />

                <div className='grid grid-rows-1 gap-y-0 '>
                    <RolesSelect employee={employee}
                        setEmployee={setemployee}
                    />
                </div>

                {/* gender select */}
                <div className='grid auto-rows-auto gap-y-0 -mt-2
                                 grid-flow-row grid-cols-1 items-start'>
                    <label className='text-lg capitalize
                                    ' htmlFor="gender">
                        gender
                    </label>
                    <select {...register('gender')}
                        id='gender' name='gender'
                        className='px-[5px] py-2 h-12 text-lg border
                                        border-gray-900 focus-within:border-[4px] 
                                        focus-within:border-black
                                        text-slate-800 
                                        '
                    >
                        {!getValues('gender')?.length &&
                            <option style={{
                                backgroundColor: isDark ? '#3349' : '#fff',
                                color: isDark ? '#fff' : '#333'
                            }} >Select Gender</option>}
                        <option style={{
                            backgroundColor: isDark ? '#3349' : '#fff',
                            color: isDark ? '#fff' : '#333'
                        }} value={'male'}>male</option>
                        <option style={{
                            backgroundColor: isDark ? '#3349' : '#fff',
                            color: isDark ? '#fff' : '#333'
                        }} value={'female'}>female</option>
                    </select>
                    {errors?.gender ?
                        <p className='text-red-500'>
                            {errors?.gender?.message}
                        </p>
                        : null
                    }
                </div>

               

                {/* buttons container */}


            </div>
            <div className='w-full 
                             flex justify-end 2xl:gap-16 xl:gap-12
                            lg:gap-12 md:gap-10 sm:gap-5 gap-4 mt-10'>
                <button type='submit'
                    disabled={isLoading}
                    className='md:px-16 sm:px-12 px-10 py-[10px] rounded
                                         bg-orange-600 md:text-xl text-lg text-white
                                         '>
                    {isLoading ? 'uploading...' : 'Submit'}
                </button>
                <button type='reset'
                    disabled={isLoading}
                    className='md:px-16 sm:px-12 px-10 py-[10px]
                                     rounded bg-slate-400 md:text-xl 
                                     text-lg text-white
                                         '>
                    reset
                </button>
            </div>

        </form>
    );
}

export default EmployeeForm;
