import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from './component/login/Login'

const useAuth = () =>{
    return sessionStorage.getItem("isLogin")
}

const ProtectedRoutes = () => {
  return useAuth() ? <Outlet/> : <Login/>
}

export default ProtectedRoutes