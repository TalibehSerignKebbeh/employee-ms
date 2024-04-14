import React from 'react';
import EmpInputContainer from './EmpInputContainer';
import RolesSelect from '../../../components/Select/RolesSelect';
import LeaveInfor from './LeaveInfor';


const EmployeeEditForm = ({ employee, handleReset,
    setemployee, isDark = false, isLoading,
    submitDataFunction, register, getValues, errors,
isDirty}) => {
    
    return (
        <form onSubmit={submitDataFunction}
            onReset={handleReset}>
            <div className='grid md:grid-cols-2 
                        sm:grid-cols-1 grid-cols-1 md:gap-x-5 sm:gap-x-2
                        md:gap-y-5 sm:gap-y-3 gap-y-2 2xl:px-5  xl:px-4 lg:px-4 md:px-3 sm:px-2 px-1
                        min-w-full'
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
                                        text-inherit bg-inherit 
                                        rounded'
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

                {/* status select */}
           <div className='grid auto-rows-auto gap-y-0 -mt-2
                                 grid-flow-row grid-cols-1 items-start'>
                    <label className='text-lg capitalize
                                    ' htmlFor="status">
                        status
                    </label>
                    <select {...register('status')}
                        id='status' name='status'
                        className='px-[5px] py-2 h-12 text-lg border
                                        border-gray-900 focus-within:border-[4px] 
                                        focus-within:border-black
                                         w-auto text-inherit bg-inherit 
                                         rounded'
                    >
                        {!getValues('status')?.length &&
                            <option style={{
                                backgroundColor: isDark ? '#3349' : '#fff',
                                color: isDark ? '#fff' : '#333'
                            }} >Select status</option>}
                        <option style={{
                            backgroundColor: isDark ? '#3349' : '#fff',
                            color: isDark ? '#fff' : '#333'
                        }} value={'active'}>active</option>
                        <option style={{
                            backgroundColor: isDark ? '#3349' : '#fff',
                            color: isDark ? '#fff' : '#333'
                        }} value={'suspended'}>suspended</option>
                        <option style={{
                            backgroundColor: isDark ? '#3349' : '#fff',
                            color: isDark ? '#fff' : '#333'
                        }} value={'deleted'}>deleted</option>
                    </select>
                    {errors?.gender ?
                        <p className='text-red-500'>
                            {errors?.gender?.message}
                        </p>
                        : null
                    }
                </div>
                {/* <div className='w-full col-span-2 '>
                    <span>Leave infor</span>
                    {employee?.current_leave?.beginDate?.toString() || 'no current leave'}
            </div> */}
               {employee?.current_leave? <LeaveInfor leave={employee?.current_leave}/> : null}

                {/* buttons container */}


            </div>
            <div className='w-full 
                             flex justify-end 2xl:gap-16 xl:gap-12
                            lg:gap-12 md:gap-10 sm:gap-5 gap-4 mt-10'>
                <button type='submit'
                    disabled={isLoading || !isDirty}
                    className='text-center  py-[10px] rounded
                            bg-orange-600 md:text-xl text-lg text-white
                             min-w-[70%] sm:min-w-[400px]'
                >
                    {isLoading ? 'loading...' : 'Submit'}
                </button>
               
            </div>

        </form>
    );
}

export default EmployeeEditForm;
