'use client'

import { useEffect } from "react";
import { useAuthStore } from "../lib/store/useAuthStore"

const AuthProvider = ({ children }) => {
    const {authUser, checkAuth} = useAuthStore();

    useEffect(()=>{
        checkAuth();
    },[authUser])
    
  return (
    <>{children}</>
  )
}

export default AuthProvider