import React from 'react'
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({children}) {
    const token=sessionStorage.getItem("currentUser")
    if(token) return children
    else {
        Navigate({to:"/login"})
        return null
    }
    
}