import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react';
import { useUpdateEmployeeProfileMutation } from '../../features/Employee/EmployeeApiSlice';
import noprfile from '../../data/noprof.png'
import UploadOutlined from '@mui/icons-material/UploadOutlined';
import { useForm } from 'react-hook-form'
import { profileSchema } from './Files';
import { yupResolver } from '@hookform/resolvers/yup';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import EmpInputContainer from '../dashboard/Employee/EmpInputContainer';
import { useGetEmployeeProfileQuery } from '../../features/Employee/EmployeeApiSlice';
import SuccessComponent from '../../components/RequestStatus/SuccessComponent';

const UserProfile = ({ selected, setSelected }) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!#@$&*?]).{5,}$/;

    const [employee, setemployee] = useState(null);

    const { data: profileData, isLoading: isProfileLoading,
        isSuccess: isProfileLoadSuccess,
        isError: isProfileLoadError,
        error: profileLoadError
    } = useGetEmployeeProfileQuery()
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark';

    useEffect(() => {
        if (isProfileLoadSuccess) {
            console.log(profileData);
            setemployee({
                ...profileData,
                dob: profileData?.dob ? format(parseISO(profileData?.dob), 'yyyy-MM-dd') : '',
                password: '', confirm_password: '',
            })
        }
        return () => {

        };
    }, [isProfileLoadSuccess, profileData]);


    const { register, handleSubmit, reset: resetForm,
        setValue, setError, getValues,
        formState: { errors, } } = useForm({
            defaultValues: employee,
            values: employee,
            resolver: yupResolver(profileSchema),
            reValidateMode: "onChange",
        })


    const [updateFunc, { isLoading, reset:ResetUpdate, data: response
        , isSuccess, error, isError, }] = useUpdateEmployeeProfileMutation()


    const handleUpdateProfile = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            // console.log(file);
            const reader = new FileReader();
            // let base64File = '';
            reader.onload = x => {
                setemployee({ ...employee, profile: x.target.result })
                setValue('profile', x.target.result)

            }
            reader.readAsDataURL(file)

            // console.log(file);
        }
    }
    useEffect(() => {
        setSelected('profile')
        return () => {

        };
    }, [setSelected]);


    const submitFunction = async (data) => {
        console.log('submit ');
        if (data.password?.length) {
            console.log('password error');
            if (passwordRegex.test(data?.password)) {
                setError('password', {
                    message: 'Password must contain at least one lowercase letter, one uppercase letter, and one of the following special characters: !#@$&*?',
                }, { shouldFocus: true })
            }
            if (!data?.password !== data?.confirm_password) {
                setError('confirm_password', { message: 'passwords must match', }, { shouldFocus: true })
            }

        }
        else {
            await updateFunc({ ...data }).unwrap()
                .then(res => {
                    console.log(res);
                    // setsuccessMessage(res?.message)
                }).catch(err => {
                    console.log(err);
                })
        }
    }
    const handleReset = () => {
        
        resetForm({ ...employee }, { keepDefaultValues: true, keepValues: true })
    }

    if (isProfileLoading) {
        return <p>Loading ....</p>
    }



    return (
        <Box className='mx-4 md:py-8 sm:py-5 py-2' display={'flex'}
            flexDirection="column" rowGap="7px" columnGap={'10px'}>
            {isSuccess ?
                <SuccessComponent message={response?.message} 
                    ResetFunc={() => {
                       ResetUpdate() 
                    }}
                />
                :
            <form onSubmit={handleSubmit(submitFunction)}
                onReset={handleReset}  >
                <div className='w-fit xl:w-96 md:w-72 sm:w-52 
                  text-start my-4 mb-14 bg-gradient-to-br from-green-400 via-pink-300 to-green-400
                 p-2 rounded grid auto-cols-auto  grid-cols-2 justify-start items-end
                '
                >
                    <img className='m-auto ml-0 rounded-md  border border-slate-700
                         h-40 w-40 justify-self-start'
                        src={getValues('profile') || noprfile} alt="profile"
                    />
                    <label htmlFor='profile'
                        className='justify-self-start w-24 h-16 flex items-center justify-center bg-slate-300 rounded'>
                        <input style={{}}
                            type={'file'}
                            onChange={handleUpdateProfile}
                            accept="image/*"
                            hidden
                            name="profile"
                            id='profile'
                        />
                        <UploadOutlined className='text-3xl ml-0 scale-[3] ' />
                    </label>
                </div>
                <hr className='h-[1px] w-full bg-slate-500 my-5' />
                <div className='grid md:grid-cols-2 
                        sm:grid-cols-2  grid-cols-1 md:gap-x-5 sm:gap-x-2
                        md:gap-y-5 sm:gap-y-3 gap-y-2 2xl:px-5  xl:px-4 lg:px-4 md:px-3 sm:px-2 px-1'
                >
                    <EmpInputContainer
                        isProfile={true}
                        title={'firstName'}
                        errors={errors}
                        inputTye='text'
                        registerProps={{ ...register('firstName') }}
                    />
                    <EmpInputContainer
                        isProfile={true}
                        title={'middleName'}
                        errors={errors}
                        inputTye='text'
                        registerProps={{ ...register('middleName') }}
                    />
                    <EmpInputContainer
                        isProfile={true}
                        title={'lastName'}
                        errors={errors}
                        inputTye='text'
                        registerProps={{ ...register('lastName') }}
                    />
                    <EmpInputContainer
                        isProfile={true}
                        title={'username'}
                        errors={errors}
                        inputTye='text'
                        registerProps={{ ...register('username') }}
                    />
                    <EmpInputContainer
                        isProfile={true}
                        title={'email'}
                        errors={errors}
                        inputTye='email'
                        registerProps={{ ...register('email') }}
                    />
                    <EmpInputContainer
                        isProfile={true}
                        title={'address'}
                        errors={errors}
                        inputTye='text'
                        registerProps={{ ...register('address') }}
                    />
                    <EmpInputContainer
                        isProfile={true}
                        title={'telephone'}
                        errors={errors}
                        inputTye='text'
                        registerProps={{ ...register('telephone') }}
                    />
                   
                    <EmpInputContainer
                        isProfile={true}
                        title={'dob'}
                        errors={errors}
                        inputTye='date'
                        registerProps={{ ...register('dob') }}
                    />

                    <EmpInputContainer
                        isProfile={true}
                        title={'password'}
                        errors={errors}
                        inputTye='password'
                        registerProps={{ ...register('password') }}
                    />
                    <EmpInputContainer
                        isProfile={true}
                        title={'confirm_password'}
                        errors={errors}
                        inputTye='password'
                        registerProps={{ ...register('confirm_password') }}
                    />
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
                                        text-inherit bg-inherit rounded 
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
                <hr className='h-[1px] w-full bg-slate-500 my-5' />
                <div className='w-full 
                             flex justify-end 2xl:gap-16 xl:gap-12
                            lg:gap-12 md:gap-10 sm:gap-5 gap-4 my-10'>
                    <button type='submit'
                        disabled={isLoading}
                        className='text-center  py-[10px] rounded
                            bg-orange-600 md:text-xl text-lg text-white
                             min-w-[70%] sm:min-w-[400px]
                                         '>
                        {isLoading ? 'uploading...' : 'Submit'}
                    </button>

                </div>

            </form>}
          
        </Box>
    );
}

export default UserProfile;
