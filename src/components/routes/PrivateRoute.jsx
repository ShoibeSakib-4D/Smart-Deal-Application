import React, { use } from 'react'
import {AuthContext} from "../../context/AuthContext"
import { Navigate } from 'react-router'

const PrivateRoute = ({children}) => {

    const {user, loading} = use(AuthContext)

    if(loading)
    {
        <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }

    if(user)
    {
      return children;
    }

  return ( <Navigate state={location?.pathname} to="/login"></Navigate> )
}

export default PrivateRoute
