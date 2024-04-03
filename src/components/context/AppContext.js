import React, { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate} from 'react-router-dom'

export const stateContext = createContext()
const freshObj = () => {
    if (localStorage.getItem('auth') === null) {
        localStorage.setItem('auth', JSON.stringify({}))
    }
    return JSON.parse(localStorage.getItem("auth"))
}
export default function AppContext() {
    const navigate = useNavigate();
    const {auth, setAuth} = useContext(stateContext)
    return {
        auth,
        setAuth: (obj) => {
            setAuth({ ...auth, ...obj })
        },
        resetAuth: () => {
            localStorage.removeItem('auth')
            setAuth(freshObj)
            navigate('/')
        }
    };
}

export const ContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(freshObj());
    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth))
    }, [auth])

    return <stateContext.Provider value={{auth, setAuth}}>
        {children}
    </stateContext.Provider>
    
}