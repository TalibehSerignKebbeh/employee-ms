import { Outlet, Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { currentToken } from "./authSlice";

import React from 'react';
import {  useRefreshTokenMutation } from "./authApiSlice";

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(currentToken)
    const effectRan = useRef(false)
    const [trueSucess, setTrueSucess] = useState(false);
    
    const [refreshToken, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshTokenMutation()
    
    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');

                try {
                    await refreshToken()
                    // const response = await refreshToken()
                    // console.log(response);
                    // const { accessToken } = response.data;
                    // console.log(accessToken);
                    setTrueSucess(true)
                } catch (error) {
                    console.log(error);
                }
            }
         if(!token && persist) verifyRefreshToken()
        }
        return () => effectRan.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    let content
    if (!persist) {  // persist no
        console.log('not persist');
        content = <Outlet />
    } else if (isLoading) { // persist yes token no
        console.log('loading...');
        content = <p>Loading...</p>
    } else if (isError) {// persist: yes, token no
        console.log('error');
        content = (<p className="errmsg">
            {`${error?.data?.message} - `}
            <Link to={'/'}>Please Login again</Link>
        </p>)
    } else if (isSuccess && trueSucess) {  // persist yes , token: yes
        console.log("Success");
        content = <Outlet />
    }
    else if (token && isUninitialized) { // persist: yes, token: yes
        console.log('token and uninit');
        console.log(isUninitialized);
        content = <Outlet />
    }
    return content
}

export default PersistLogin;
