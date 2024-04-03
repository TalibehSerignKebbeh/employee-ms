import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext'

export default function UsingAuth() {
  return useContext( AuthContext )
}
