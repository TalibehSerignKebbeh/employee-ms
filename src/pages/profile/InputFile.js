//  <form onSubmit={handleSubmit(submitFunction)}
//                 onReset={handleReset}>
//                 <Box className='xl:w-auto mx-auto my-auto xl:mx-5 md:my-3
//              md:m-auto sm:m-auto md:flex max-md:flex-col
//              sm:flex sm:flex-col md:text-center md:justify-center
//               flex gap-y-6 '

//                     sx={{
//                         d: 'flex', flexDirection: 'row', rowGap: '25px', columnGap: '25px',
//                         flexWrap: 'wrap', alignItems: 'end', justifyContent: 'start'
//                     }}
//                     backgroundColor={bgColor} color={colors.grey[100]}
//                 >

//                     <Box className='xl:w-96 md:w-72 sm:w-52 flex flex-row items-end'>
//                         <img className='m-auto rounded-md  border border-slate-700'
//                             src={employee?.profile || noprfile} alt="profile"
//                             width={'150px'} height="150px" />
//                         <label htmlFor='profile'
//                             className='w-24 h-16 bg-slate-300 rounded'>
//                             <input style={{ color: `${colors.grey[100]}` }}
//                                 type={'file'}
//                                 onChange={handleUpdateProfile}
//                                 // accept="image/.png image/.jpg image/.jpeg"
//                                 accept="image"

//                                 hidden
//                                 name="profile"
//                                 id='profile'
//                             />
//                             <UploadOutlined className='uploader ml-0' />
//                         </label>
//                         {/* <FileBase id='profile' type='file' multiple={false} onDone={({ base64 }) => { setemployee({ ...employee, profile: base64 }); setimgsrc(base64) }} /> */}
//                     </Box>

//                     <InputWrapper>

//                         <label className='text-start text-lg' htmlFor='firstname'>FirstName</label>
//                         <input className={` h-12 px-2 font-semibold text-gray-600 rounded border border-slate-700`} type={'text'}
//                             {...register('firstName')}
//                             value={employee.firstName}
//                             onChange={(e) => setemployee({ ...employee, firstName: e.target.value })}
//                             id="firstname" placeholder='firstName'
//                         />
//                         {errors?.firstName ?
//                             <p className='text-red-500 text-start'>
//                                 {errors?.firstName?.message}
//                             </p>
//                             : null
//                         }
//                     </InputWrapper>
//                     <InputWrapper>
//                         <label className='text-start text-lg ' htmlFor='middleName'>MiddleName</label>
//                         <input className={` h-12 px-2 font-semibold text-gray-600 rounded border border-slate-700`} type={'text'}
//                             value={employee.middleName}
//                             {...register('middleName')}
//                             id="middleName"
//                             onChange={(e) => setemployee({ ...employee, middleName: e.target.value })}
//                             placeholder='middleName'
//                         />
//                         {errors?.middleName ?
//                             <p className='text-red-500 text-start'>
//                                 {errors?.middleName?.message}
//                             </p>
//                             : null
//                         }

//                     </InputWrapper>
//                     <InputWrapper>

//                         <label className='text-start text-lg' htmlFor='lastName'>LastName</label>
//                         <input className={` h-12 px-2 font-semibold text-gray-600 rounded border border-slate-700`}
//                             type={'text'}
//                             {...register('lastName')}
//                             value={employee.lastName}
//                             id="lastName"
//                             onChange={(e) => setemployee({ ...employee, lastName: e.target.value })}
//                             placeholder='lastName'
//                         />
//                         {errors?.lastName ?
//                             <p className='text-red-500 text-start'>
//                                 {errors?.lastName?.message}
//                             </p>
//                             : null
//                         }
//                     </InputWrapper>
//                     <InputWrapper>

//                         <label className='text-start text-lg' htmlFor='username'>Username</label>
//                         <input className={` h-12 px-2 font-semibold text-gray-600 rounded border border-slate-700`}
//                             type={'text'}
//                             {...register('username')}

//                             value={employee.username}
//                             id="username"
//                             onChange={(e) => setemployee({ ...employee, username: e.target.value })}
//                             placeholder='username'
//                         />
//                         {errors?.username ?
//                             <p className='text-red-500 text-start'>
//                                 {errors?.username?.message}
//                             </p>
//                             : null
//                         }
//                     </InputWrapper>

//                     <InputWrapper>
//                         <label className='text-start text-lg' htmlFor='address'>Address</label>
//                         <input className={` h-12 px-2 font-semibold text-gray-600 rounded border border-slate-700`}
//                             type={'text'}
//                             {...register('address')}
//                             value={employee.address} id="address"
//                             onChange={(e) => setemployee({ ...employee, address: e.target.value })}
//                             placeholder='address'
//                         />
//                         {errors?.address ?
//                             <p className='text-red-500 text-start'>
//                                 {errors?.address?.message}
//                             </p>
//                             : null
//                         }

//                     </InputWrapper>
//                     <InputWrapper>

//                         <label className='text-start text-lg' htmlFor='email'>Email</label>
//                         <input className={` h-12 px-2 font-semibold text-gray-600 rounded border border-slate-700`}
//                             type={'email'}
//                             {...register('email')}
//                             value={employee.email} id="email"
//                             onChange={(e) => setemployee({ ...employee, email: e.target.value })}
//                             placeholder='email'
//                         />
//                         {errors?.email ?
//                             <p className='text-red-500 text-start'>
//                                 {errors?.email?.message}
//                             </p>
//                             : null
//                         }
//                     </InputWrapper>
//                     <InputWrapper>

//                         <label className='text-start text-lg' htmlFor='tel'>Telephone</label>
//                         <input className={` h-12 px-2 
//                     font-semibold text-gray-600 rounded border border-slate-700`}
//                             type={'text'}
//                             {...register('telephone')}
//                             value={employee.telephone} id="tel"
//                             onChange={(e) => setemployee({ ...employee, telephone: e.target.value })}
//                             placeholder='telephone'
//                         />
//                         {errors?.telephone ?
//                             <p className='text-red-500 text-start'>
//                                 {errors?.telephone?.message}
//                             </p>
//                             : null
//                         }
//                     </InputWrapper>
//                     <InputWrapper>

//                         <label className='text-start text-lg
//                     ' htmlFor='dob'>
//                             Date of birth</label>
//                         <input className={` h-12 px-2 font-semibold 
//                     text-gray-600 rounded border border-slate-700`}
//                             type={'date'}
//                             value={employee?.dob?.slice(0, 10)}
//                             {...register('dob')}
//                             id="dob"
//                             onChange={(e) => setemployee({ ...employee, dob: e.target.value })}
//                             placeholder='date of birth'
//                         />
//                         {errors?.dob ?
//                             <p className='text-red-500 text-start'>
//                                 {errors?.dob?.message}
//                             </p>
//                             : null
//                         }
//                     </InputWrapper>
//                     <Box className='xl:w-80 md:w-56 sm:w-52 mr-auto ml-0'

//                         fontSize='1rem' fontStyle={'italic'}>
//                         <label className='text-start block text-lg'
//                             htmlFor='gender'>Gender</label>
//                         <select className={`h-12 px-2 
//                     font-semibold text-gray-600 rounded
//                     text-start -ml-4 mr-auto  border border-slate-700`}
//                             id='gender'
//                             {...register('gender')}
//                             value={employee.gender}
//                             onChange={e =>
//                                 setemployee({
//                                     ...employee,
//                                     gender: e.target.value
//                                 })}
//                         >
//                             {!employee?.gender && <option value={''}>Choose gender</option>}
//                             <option value={'male'}>male</option>
//                             <option value={'female'}>female</option>
//                             <option value={'other'}>other</option>
//                         </select>
//                         {errors?.gender ?
//                             <p className='text-red-500 text-start'>
//                                 {errors?.gender?.message}
//                             </p>
//                             : null
//                         }
//                     </Box>
//                     <InputWrapper>
//                         <label className='text-start text-lg
//                     ' htmlFor='password'>
//                             password</label>
//                         <input className={` h-12 px-2 font-semibold 
//                     text-gray-600 rounded border border-slate-700`}
//                             type={'password'}
//                             value={employee?.password}
//                             {...register('password')}
//                             id="password"
//                             onChange={(e) => setemployee({ ...employee, password: e.target.value })}
//                             placeholder='password'
//                         />
//                         {errors?.password ?
//                             <p className='text-red-500 text-start'>
//                                 {errors?.password?.message}
//                             </p>
//                             : null
//                         }
//                     </InputWrapper>
//                     <InputWrapper>
//                         <label className='text-start text-lg
//                     ' htmlFor='confirm_password'>
//                             confirm password</label>
//                         <input className={` h-12 px-2 font-semibold 
//                     text-gray-600 rounded border border-slate-700`}
//                             type={'password'}
//                             value={employee?.confirm_password}
//                             {...register('confirm_password')}
                             
//                             id="confirm_password"
//                             onChange={(e) => setemployee({ ...employee, confirm_password: e.target.value })}
//                             placeholder='confirm password'
//                         />
//                         {errors?.confirm_password ?
//                             <p className='text-red-500 text-start'>
//                                 {errors?.confirm_password?.message}
//                             </p>
//                             : null
//                         }
//                     </InputWrapper>




//                 </Box>
//                 <div className='w-full 
//                              flex justify-end gap-4 my-5'>
//                     <button type='submit'
//                         // disabled={isLoading}
//                         className='md:px-16 sm:px-12 px-10 py-[10px] rounded
//                                          bg-orange-600 md:text-xl text-lg text-white
//                                          '>
//                         {isLoading ? 'uploading...' : 'Submit'}
//                     </button>
//                     <button type='reset'
//                         // disabled={isLoading}
//                         className='md:px-16 sm:px-12 px-10 py-[10px]
//                                      rounded bg-slate-600 md:text-xl 
//                                      text-lg text-white
//                                          '>
//                         reset
//                     </button>
//                 </div>
//             </form>