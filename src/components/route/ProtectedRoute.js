import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Loader } from '../layouts/Loader'

function ProtectedRoute({children,isAdmin}) {
    const {isAuthendicated,loading,user}=useSelector(state=>state.authState)
  
    if(!isAuthendicated && !loading) {
        return <Navigate to="/login"/>
    }
    if(isAuthendicated){
if(isAdmin===true && user.role=== !"admin"){
  return <Navigate to="/home"/>

}
      return children
    }
    if(loading){
    return <Loader/> 
    }
}

export default ProtectedRoute