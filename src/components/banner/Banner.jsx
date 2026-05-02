import React from 'react'
import { NavLink } from 'react-router'

const Banner = () => {
  return (
    <div>
          <div className="relative overflow-hidden bg-linear-to-r from-purple-100 via-blue-100 to-green-100 py-20 px-6 text-center">

      {/* LEFT DECORATION */}
      <div className="absolute left-0 top-0 opacity-30">
        <svg width="300" height="300" viewBox="0 0 200 200" fill="none">
          <path
            d="M0,100 Q100,0 200,100 T400,100"
            stroke="#a855f7"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* RIGHT DECORATION */}
      <div className="absolute right-0 top-0 opacity-30 rotate-180">
        <svg width="300" height="300" viewBox="0 0 200 200" fill="none">
          <path
            d="M0,100 Q100,0 200,100 T400,100"
            stroke="#22c55e"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Deal Your <span className="text-purple-600">Products</span>
          <br />
          In A <span className="text-purple-600">Smart</span> Way !
        </h1>

        <p className="mt-4 text-gray-500">
          SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!
        </p>

        {/* SEARCH */}
        <div className="mt-6 flex justify-center">
          <div className="join w-full max-w-md shadow-lg">
            <input
              type="text"
              placeholder="Search for products, categories..."
              className="input input-bordered join-item w-full"
            />
            <button className="btn btn-primary join-item">
              🔍
            </button>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex justify-center gap-4">
         <NavLink className="btn btn-primary" to='/allProducts' >
             Watch All Products
         </NavLink>
          <button className="btn btn-outline btn-primary">Post a Product</button>
        </div>
      </div>
    </div>


     

    </div>
  )
}

export default Banner
