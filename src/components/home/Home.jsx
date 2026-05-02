import React, { use, useEffect, useState } from 'react'
import Banner from '../banner/Banner'
import RecentProducts from '../recentProducts/RecentProducts'
import { AuthContext } from '../../context/AuthContext'
import { data } from 'react-router'

const Home = () => {


  const [recentProducts, setRecentProducts] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(()=>{
fetch("http://localhost:5000/recent-products")
 .then(res => res.json() )
 .then(data => 
{
  setRecentProducts(data)
  setLoading(false)
}
 )
  },[])

  return (
    <div>
      This is home
      <Banner></Banner>
      { loading ? <>
        <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
      </>: 
      
      <>      <RecentProducts recentProducts={recentProducts} ></RecentProducts>
</> }

    </div>
  )
}

export default Home
