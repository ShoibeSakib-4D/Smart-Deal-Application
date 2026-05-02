import React, { use } from 'react'
import { NavLink } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import { updateProfile } from 'firebase/auth'



const Register = () => {

  const {createUser, registerWithGoogle} = use(AuthContext)

  //register with google
      const handleRegisterWithGoogle = () =>{
        registerWithGoogle()
         .then((result) => {
   console.log(result.user)
  }).catch((error) => {
    console.log(error.message)
  });

    }

    const handleRegister = e =>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const passWord = form.password.value

       // handle register user in firebase
       createUser(email,passWord)
        .then((result) => { 
          
        updateProfile(result.user, {
        displayName: name
      });


          console.log(result.user), 
            e.target.reset()

          })
        .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

    }

  return (
    <div>
          <form onSubmit={handleRegister} className="hero bg-base-200">
  <div className="hero-content flex-col flex-wrap lg:flex-row-reverse">
    <div className="text-center ">
      <h1 className="text-5xl font-bold">Register Now!</h1>
      <p className='mt-3'>Already Have an account? <NavLink className="text-primary" to="/login">Login Now</NavLink></p>
     

    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">

          <label className="label">Name</label>
          <input name='name' type="text" className="input" placeholder="Name" />

          <label className="label">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" />

           <label className="label">Image URL</label>
          <input type="text" className="input" placeholder="Image URL" />

          <label className="label">Password</label>
          <input name="password" type="password" className="input" placeholder="Password" />

          <div><a className="link link-hover">Forgot password?</a></div>

          <input type='submit' value="Register/SignIn" className="btn btn-neutral mt-4"></input>

            <div className="divider divider-primary">OR</div>

<button onClick={handleRegisterWithGoogle} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>

        </fieldset>
      </div>
    </div>
  </div>

  
</form>



    </div>
  
  )
}

export default Register
