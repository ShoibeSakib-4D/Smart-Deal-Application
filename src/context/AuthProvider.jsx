import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../firebase/Firebase.init'

const AuthProvider = ({children}) => {

    //user observation means it will manage the state of user exist or not
    const [user,setUser] = useState(null)

    //it will manage the idle time till the user or any operation not succesed, and shows the loading icon
    const [loading, setLoading] = useState(true)

    //create user with email and password / Sign up new users
    const createUser = (email, password) => {
        setLoading(true)
     return createUserWithEmailAndPassword(auth, email, password,)
    }

    //Sign in existing users
    const signInExistingUser = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //Set an authentication state observer and get user data/currently signin user
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
         

                setUser(currentUser)

                    if(currentUser)
             {
                const loggedUserEmail = {email : currentUser?.email}
                fetch('http://localhost:5000/getToken',{
                    method : "POST",
                    headers : {"content-type" : "application/json"},
                    body : JSON.stringify(loggedUserEmail)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log("token after user loggedin:",data)
                   localStorage.setItem("user-token",data.token)
                })
             }

             else
             {
                localStorage.removeItem("user-token")
             }

                setLoading(false);
        })

        return () =>{ unsubscribe ()}
    },[])

    //registerWithGoogle
    const provider = new GoogleAuthProvider();
    const registerWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    
    
    //signOut

    const userSignOut = () => {
        
        return signOut(auth)
    }


    //all info 
    const authInfo = {
        createUser,
        signInExistingUser,
        registerWithGoogle,
        userSignOut,
       user,
       loading,

    }


  return (
   <AuthContext value={authInfo}>
    {children}
   </AuthContext>
  )
}

export default AuthProvider
