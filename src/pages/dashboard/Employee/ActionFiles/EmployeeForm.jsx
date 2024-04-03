import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Username is required').max(20),
  password: yup
    .string()
    .required('Password is required')
    .max(20)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!#@$&*?]).{6,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one of the following special characters: !#@$&*?'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  telephone: yup.string().required('Telephone is required').max(20),
  address: yup.string().required('Address is required').max(20),
  jobTitle: yup.string().required('Job Title is required').max(20),
});

const EmployeeForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle form submission here
      console.log(data);
      console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>
        <Controller
          name="username"
          control={control}
                  render={({ field }) => <input
          className='px-[5px] py-2 h-12 text-lg -mt-3 border
                                border-gray-900 focus-within:border-[4px] focus-within:border-black'            {...field} />}
        />
        <p>{errors.username?.message}</p>
      </div>
      <div>
        <label>Password</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => <input type="password" {...field} />}
        />
        <p>{errors.password?.message}</p>
      </div>
      <div>
        <label>Confirm Password</label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => <input type="password" {...field} />}
        />
        <p>{errors.confirmPassword?.message}</p>
      </div>
      <div>
        <label>Telephone</label>
        <Controller
          name="telephone"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        <p>{errors.telephone?.message}</p>
      </div>
      <div>
        <label>Address</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        <p>{errors.address?.message}</p>
      </div>
      <div>
        <label>Job Title</label>
        <Controller
          name="jobTitle"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        <p>{errors.jobTitle?.message}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmployeeForm;
