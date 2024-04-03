import React, { useEffect,useState} from 'react';
import Employees from './dashboard/Employee/Employees';
import { Link } from 'react-router-dom';
import { apiInstance } from '../api';
import { useSelector } from 'react-redux';
import { currentToken } from '../features/auth/authSlice';
// import { useGetEmployeesQuery } from '../features/Employee/EmployeeApiSlice';

const Home = ({employees, setemployees}) => {
    const token = useSelector(currentToken)
    const [loadingData, setloadingData] = useState(false);

    // const {data: empsData, isLoading,isSuccess, isError, error}= useGetEmployeesQuery()

    useEffect(() => {
        // if (isSuccess) {
        //     console.log(empsData);
        //    setemployees(empsData)
        // }
        // if (isError) {
        //     console.log(error);
        // }
        const fetchEmps = async () => {
                    setloadingData(true)
            await apiInstance( token).get('/employee')
                .then((res) => {
                    console.log(res.data);
                    setemployees(res.data)
                    setloadingData(false)
                }).catch(err => {
                    console.log(err)
                    setloadingData(false)

                })
        }
        fetchEmps()
            return () => {
                
            };
     }, [])
    
    return (
        <div>
            <h2 className='title'>Employee Management System frontend</h2>
            <Link to={'add'} className='link' >Add Employee</Link>
            <br />
            <Link to={'/leave'} className='link' >Leaves</Link>
            {/* <h1>{employees?.length }</h1> */}
            <Employees employees={employees} loadingData={loadingData} />
        </div>
    );
}

export default Home;
