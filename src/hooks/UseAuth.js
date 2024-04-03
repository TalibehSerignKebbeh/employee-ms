
import { useSelector } from 'react-redux';
// import { currentToken } from '../features/auth/authSlice';
import {
     currentToken
} from '../features/auth/authSlice';
import jwtDecode from 'jwt-decode'

const UseAuth = () => {
    const token = useSelector(currentToken)
    let activeStatus = '';
    let isAdmin = false
    let status = "Employee";
    let roles = [];
    let username=''
   
    if (token) {
         const decoded = jwtDecode(token)
        const { UserInfo } = decoded;
        // isCeo = UserInfo?.roles?.includes('ceo') 
        isAdmin = UserInfo?.roles?.includes('admin')
        if (isAdmin) status = "Admin"
        roles = UserInfo?.roles;
        status = UserInfo?.status;
        username = UserInfo?.username
        
        return {token,roles,username, isAdmin,  status,
        activeStatus}
    }
    return {token,roles,username,  isAdmin, status,
    activeStatus}
}

export default UseAuth;
