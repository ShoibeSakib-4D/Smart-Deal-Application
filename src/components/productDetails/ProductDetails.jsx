import React, { use, useEffect, useRef, useState } from 'react'
import { useLoaderData } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import Swal from 'sweetalert2'



const ProductDetails = () => {
  const {user} = use(AuthContext)


   const {_id : productId, title } = useLoaderData()
   const [bidCount, setBidCoutn] = useState(null)
   const [loading, setLoading] = useState(true)

   useEffect(()=>{
    fetch(`http://localhost:5000/products/bids/${productId}`,{
       headers : { "authorization" : `Bearer ${user?.accessToken}`}
    })
    .then(res => res.json())
    .then(data => {
      setBidCoutn(data)
      setLoading(false)
      console.log('Bids after count',data)
    })
   },[productId])
   


  const bidRef = useRef(null)
  const bidProductModal = () => {

 bidRef.current.showModal()

  }

  const handleModalForm = (e) => {
    e.preventDefault()
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const bid = Number(form.bid.value);

    const bidInfo = {
         product : productId,
         buyer_name :	name,  
         buyer_email	: email,
         bid_price	:bid,
         status :"Pendin - Not default",
    }

    fetch("http://localhost:5000/bids",{
      method : "POST",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(bidInfo)
    })
    .then(res => res.json())
    .then(data => {

      bidRef.current.close()

      if(data.insertedId)
      {
       
Swal.fire({
  title: "Bid Place Successfully",
  icon: "success",
  draggable: true,
  timer: 1000
});

//add the new bid to the state instantly

bidInfo._id = data.insertedId;
const setCurrentAllBids = [...bidCount, bidInfo]
setCurrentAllBids.sort((a,b)=>b.bid_price-a.bid_price)
setBidCoutn(setCurrentAllBids)


      }
      console.log("After place the bid and send the bid data to DB :", data)
    
    })
  }

 



  return (
  <div>
    {
        
    loading ? 
    (  <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>) 
      : 
      (  <div className='flex flex-col items-center my-3 gap-2'>
       <img className='rounded-xl'
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />

      <h5>{title}</h5>

      <button onClick={bidProductModal} className='btn btn-primary'>I want to buy this product</button>


<h5 className='text-5xl'>Bids for this product : <span className='text-primary'>{bidCount?.length}</span></h5>

<div>

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
      bidCount.map((bid,index)=>  <tr>
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
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>)
    }
    </tbody>

  </table>

</div>

{/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog ref={bidRef}  className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Give Seller Your Offer Price</h3>
 
 <form onSubmit={handleModalForm}>
     <fieldset className="fieldset">
          <label className="label">Your Name</label>
          <input readOnly defaultValue={user?.displayName} type="text" name='name' className="input" placeholder="name" />

          <label className="label">Your E-Mail</label>
          <input readOnly defaultValue={user?.email} type="text" name='email' className="input" placeholder="email" />

          <label className="label">Your Bid</label>
          <input type="number" name='bid' className="input" placeholder="place your bid" />



          <button className="btn btn-neutral mt-4">Place The Bid</button>
        </fieldset>
 </form>
    
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

    </div>)
    
    }
  </div>
  )
}

export default ProductDetails
