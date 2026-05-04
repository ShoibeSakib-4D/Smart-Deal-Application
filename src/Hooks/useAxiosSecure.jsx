import axios from "axios"
import useCustomHookForUseAuth from "./useCustomHookForUseAuth"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import useAxiosHook from "./useAxiosHook"

/* const instance = axios.create({
   baseURL: "http://localhost:5000"
}) */
const instance = useAxiosHook()

const useAxiosSecure = () => 
{
        const {user,userSignOut} = useCustomHookForUseAuth()
        const navigate = useNavigate()

//interceptor ta jate bar bar bar bar call na hoe, means memory lick jate na hoe application a, tai etake unmount kora

useEffect(()=>{
  //request interceptor
    const requestInterceptor = 
  
    instance.interceptors.request.use((config)=>{
        console.log(config)

        config.headers.authorization = `Bearer ${user?.accessToken}`

        return config;
    })

    //response interceptor
   const responseInterceptor = instance.interceptors.response.use(res =>{
      return res;
    },err =>{

      const status = err.status;
      if(status === 401 || status === 403)
      {
        console.log('log out for bad request')

         userSignOut()
         .then(()=>{
           navigate('/register')
         })
      }
    })


    return () => {
      instance.interceptors.request.eject(requestInterceptor)
    }

    return () => {
      instance.interceptors.response.eject(responseInterceptor)
    }

},[])

  return instance;
}

export default useAxiosSecure