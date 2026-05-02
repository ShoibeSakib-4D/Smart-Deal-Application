import React, { use } from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../footer/Footer'
import { AuthContext } from '../../context/AuthContext'

const RootLayout = () => {
  const {loading} = use(AuthContext)

  if(loading)
  {
     return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }
  return (
 <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
 </>
  )
}

export default RootLayout
