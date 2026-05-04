//import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';
import useCustomHookForUseAuth from '../../Hooks/useCustomHookForUseAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
//import useAxiosHook from '../../Hooks/useAxiosHook';

const CreateAProduct = () => {

    const {user} = useCustomHookForUseAuth();
   // const axiosInstance = useAxiosHook()
   const axiosSecure = useAxiosSecure()

    const handleCreateProduct = e => {
        e.preventDefault()

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const imageURL = form.imageURL.value;
        const minPrice = form.minPrice.value
        const maxPrice = form.maxPrice.value

        const newProduct = {name, email, imageURL, minPrice, maxPrice}

        console.log(newProduct,user.email, user.displayName)

        /* axios.post("http://localhost:5000/products", {newProduct})
        .then(data =>{
            if(data.data.acknowledged === true)
            {
                e.target.reset()

                Swal.fire({
  title: "Product Added Successflly!",
  icon: "success",
  draggable: true
});
            }
        }) */

            axiosSecure.post('/products',newProduct)
            .then(data =>{
                console.log(data.data)
                if(data.data.acknowledged === true)
                {
                  e.target.reset()

                      Swal.fire({
  title: "Product Added Successflly!",
  icon: "success",
  draggable: true
});
                }
            })

    }

  return (
    <div className='mx-auto w-1/2'>
       <form  onSubmit={handleCreateProduct}>
     <fieldset className="fieldset">

          <label className="label">Your Name</label>
          <input  type="text" name='name' className="input" placeholder="name" />

          <label className="label">Your E-Mail</label>
          <input type="email" name='email' className="input" placeholder="email" />

          <label className="label">Image URL</label>
          <input type="link" name='imageURL' className="input" placeholder="Image URL" />

          <label className="label">Min Price</label>
          <input type="number" name='minPrice' className="input" placeholder="Min Price" />

          <label className="label">Max Price</label>
          <input type="number" name='maxPrice' className="input" placeholder="Max Price" />



          <button className="btn btn-neutral mt-4">Create The Product</button>



        </fieldset>
 </form>
    
    </div>
  )
}

export default CreateAProduct
