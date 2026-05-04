import { use} from "react"
import { AuthContext } from "../context/AuthContext"

const useCustomHookForUseAuth = () => {
    const useAuth = use(AuthContext)
    return useAuth;
}

export default useCustomHookForUseAuth