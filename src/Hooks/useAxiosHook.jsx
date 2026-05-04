import axios from "axios";

/* const instanceAxios = axios.create({

  baseURL: "http://localhost:5000",
 
}); */

const useAxiosHook = () => {
    
    //return instanceAxios
    return axios.create({ baseURL: "http://localhost:5000"})
}

export default useAxiosHook;