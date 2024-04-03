import React, {createContext,useContext, useState} from 'react'

const AuthContext = createContext()
export function AuthProvider({childreen}) {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {childreen}
    </AuthContext.Provider>
  )
}

export default AuthContext;
