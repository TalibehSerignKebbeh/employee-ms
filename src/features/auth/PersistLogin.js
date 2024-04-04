import { Outlet, Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { currentToken } from "./authSlice";

import React from 'react';
import {  useRefreshTokenMutation } from "./authApiSlice";
import Loaddder from "../../components/Loaddder";

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
        content = <Loaddder loadingText={'loading page\'s hmtl content'} />
    } else if (isError) {// persist: yes, token no
        console.log('error');
        content = (<div className="w-full h-full flex items-start justify-center">
    <div className="p-2 sm:p-20 md:p-28 py-40 bg-gradient-to-br from-rose-300 via-rose-100 to-rose-500
             rounded-md">
                <p className="text-xl sm:text-xl md:text-3xl">
            {error?.data?.message}
            </p>
      <Link to={'/'} className='text-lg'
      >Please Login again</Link>
                </div>
        </div>)
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
