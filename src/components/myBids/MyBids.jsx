import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../Hooks/useAxiosSecure'

const MyBids = () => {

  const {user} = use(AuthContext)

  const [myBids,setMyBids] = useState([])
  const [loading, setLoading] = useState(true)

  console.log('Token:', user.accessToken)

  //axios secure wiht token
  const axiosSecure = useAxiosSecure()
  
  useEffect(()=>{

    axiosSecure.get(`/bids?email=${user?.email}`)
    .then(data =>{
      setMyBids(data.data)
       setLoading(false)
    })

  },[user?.email])

 /*  useEffect(()=>{
    fetch(`http://localhost:5000/bids?email=${user?.email}`,
      {headers :
         {"authorization" : `Bearer ${localStorage.getItem("user-token")}` }
    })
    .then(res => res.json())
    .then(data =>
      {
        setMyBids(data)
        setLoading(false)
        console.log(data)
      })
  }, [user?.email]) */

const handleDelete = _id => {
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed)
  {
    fetch(`http://localhost:5000/bids/${_id}`,{
      "method" : "DELETE"
    })
    .then(res => res.json())
    .then(data => {

      if(data.deletedCount)
      {
         Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
      }

      const remainingBids = myBids.filter(bid => bid?._id != _id)
      setMyBids(remainingBids)

      console.log(data)
    })
  }
}
);
}
 
  return (

 
<div>
  
    {
loading ? (<div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>) : ( <div>
      <h5 className='text-5xl'>Your Bids : <span className='text-primary'>{myBids.length}</span></h5>

   
   
 <table className="table">
    
    {/* head */}
    <thead>
      <tr>
       
        <th>SL No.</th>
        <th>Buyer Name</th>
        <th>Buyer email</th>
        <th>Bid Price</th>
        <th>Show Detail</th>
      </tr>

    </thead>

 <tbody>
      {/* row 1 */}
    {
      myBids.map((bid,index)=>  <tr>
        <th>
        {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{bid.buyer_name}</div>
            </div>
          </div>
        </td>
        <td>
{bid.buyer_email}          <br />
        </td>
        <td>{bid.bid_price}</td>
        <th>
          <button onClick={() => handleDelete(bid._id)} className="btn btn-primary">Delete Bid</button>
        </th>
      </tr>)
    }
    </tbody>

  </table>


    </div>)
    }

    

</div>
   
  )
}

export default MyBids
