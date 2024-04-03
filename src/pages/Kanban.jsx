import React from 'react'

const Kanban = () => {
  return (
    <div>
      Kanban
       {/* <Box width={'auto'} height="100vh" display={'flex'} flexDirection="column">
              <h3 className='text-start ml-2 mt-2 from-neutral-400'>Dashboard</h3>
              <Box display={'flex'} sx={{ marginX: '10px' }} flexDirection="row" flexWrap="wrap" gap={'25px'} >
                <Box display="flex" flexDirection={'row'} gap="" alignItems={'center'} justifyContent='center' width="200px" height={'150px'}
                  className={`bg-gradient-to-r ${(theme.palette.mode === 'dark') ? ' from-gray-400 to-gray-700' : 'from-gray-100 to-gray-300'}  
                  px-2 py-4 w-40`}>
                  <Box display={'flex'} flexDirection="column" rowGap={'8px'}  alignSelf="center">
                    <PeopleOutlined className='my-dash-icon text-grey-100 m-auto my-1 mx-4' />
                    <h3 className='text-center text-grey-100 mt-2 p-2 text-3xl  m-auto text-purple-600'>{employees?.length}</h3>
                  </Box>
                  <h2 className='text-lg text-grey-100  m-auto'>Employees</h2>
                </Box>
                <Box backgroundColor={(theme.palette.mode === 'dark') ? '#312D4B' : '#fff'}  className="shadow-2xl"
                  width={'400px'} display='flex' flexDirection={'column'} height="fit-content" justifyContent={'flex-start'}>
                  <Box width="100%" marginBottom={'30px'}>
                    <h3 className='text-start text-gray-400 mt-2 p-2 text-xl  m-auto w-full'>Employee Statistcs</h3>
                  </Box>
                  <Box display="flex" flexDirection={'row'} gap="6px" alignItems={'center'} justifyContent={'flex-start'}>
                    <Box display={'inline-flex'} margin="0 0 8px 8px" className="bg-green-300 w-11 h-11 rounded-sm">
                      <PeopleOutlined sx={{ margin: 'auto' }} />
                    </Box>
                    <Box className='h-11 flex-col items-center justify-center'>
                      <h4 className=' text-sm -mt-1 font-thin'>Leave</h4>
                      <h4 className=' text-xxl -mt-2 '>{empsOnLeave.length}</h4>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection={'row'} gap="6px" alignItems={'center'} justifyContent={'flex-start'}>
                    <Box display={'inline-flex'} margin="0 0 8px 8px" className="bg-green-300 w-11 h-11 rounded-sm">
                      <PeopleOutlined sx={{ margin: 'auto' }} />
                    </Box>
                    <Box className='h-11 flex-col items-center justify-center'>
                      <h4 className=' text-sm -mt-1 font-thin'>Active</h4>
                      <h4 className=' text-xxl -mt-2 '>{empsOnLeave.aci}</h4>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" flexDirection={'row'} gap="20px" alignItems={'center'} justifyContent='center' width="240px"
                  className={`bg-gradient-to-r ${(theme.palette.mode === 'dark') ? ' from-gray-400 to-gray-700' : 'from-gray-100 to-gray-300'}  px-2 py-4`}
                >
                  <Box display={'flex'} flexDirection="column" >
                    <TaskOutlined className='my-dash-icon text-grey-100 m-auto my-1 mx-4' />
                    <h3 className='text-center text-blue-500 mt-2 p-2 text-xl  m-auto '>{todos?.length}</h3>
                  </Box>
                  <h2 className='text-lg text-grey-100  m-auto'>Todos</h2>
                </Box>
                <Box display="flex" flexDirection={'row'} gap="20px" alignItems={'center'} justifyContent='center' width="240px"
                  className={`bg-gradient-to-r ${(theme.palette.mode === 'dark') ? ' from-gray-400 to-gray-700' : 'from-gray-100 to-gray-300'}  px-2 py-4`}
                >
                  <Box display={'flex'} flexDirection="column" >
                    <TaskOutlined className='my-dash-icon text-grey-100 m-auto my-1 mx-4' />
                    <h3 className='text-center text-grey-100 mt-2 p-2 text-xl  m-auto '>{leaves?.length}</h3>
                  </Box>
                  <h2 className='text-lg text-grey-100  m-auto'>Leaves</h2>
                </Box>

              </Box>
            </Box> */}
    </div>
  )
}

export default Kanban
