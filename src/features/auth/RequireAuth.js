import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import UseAuth from '../../hooks/UseAuth';
import { DisallowedStatus } from '../../config/Roles';

const RequireAuth = ({allowedRoles}) => {
    const { token, roles, status } = UseAuth()

    const location = useLocation()
    return (
        !token? <Navigate to={'/'} />
            : Object.values(DisallowedStatus).includes(status)
                ? <Navigate to={'/denied'} state={{ from: location }} replace />
                :
            roles?.find(role => allowedRoles.includes(role)) ?
            <Outlet/>:  <Navigate to={'/'} state={{from: location}} replace />
            
    );
}

export default RequireAuth;
