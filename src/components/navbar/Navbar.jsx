import React, { use } from 'react'
import { NavLink } from 'react-router'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {

  const {user, userSignOut, loading} = use(AuthContext)

    const item = <>
     <li><NavLink to="/">Home</NavLink></li>
       
        <li><NavLink to="/allProducts">All Products</NavLink></li>
    </>

    const handleSignOut = () =>{
         userSignOut()
         .then(() => {
  console.log(" Sign-out successful.")
}).catch((error) => {
  console.log(error)
});

    }
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {item}
       {
        user && <>
          <li><NavLink to="/myProducts">My Products</NavLink></li>
       
        <li><NavLink to="/myBids">My Bids</NavLink></li>
        </>
       }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Smart<span className='text-primary'>Deals</span></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {item}
      {
        user && <>
          <li><NavLink to="/myProducts">My Products</NavLink></li>
       
        <li><NavLink to="/myBids">My Bids</NavLink></li>
        </>
       }
    </ul>
  </div>
  <div className="navbar-end">
  {
user ? (<button onClick={handleSignOut} className="btn">Logout</button>) 
  : (
    <>
      <NavLink className="btn" to="/register">Register</NavLink>
      <NavLink className="btn ml-2" to="/login">Login</NavLink>
    </>
  )
  }
  </div>
</div>
  )
}

export default Navbar
