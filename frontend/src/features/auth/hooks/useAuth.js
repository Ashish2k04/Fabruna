import {setUser, setError, setLoading} from "../auth.slice";
import {register} from "../services/auth.api"
import {useDispatch}  from "react-redux"

export const useAuth = () => {
    const dispatch = useDispatch();

    async function handleRegister({email, password, contact, fullname, isSeller = false}) {
        dispatch(setLoading(true));
        try{
           const response = await register({email, password, contact, fullname})
           console.log(response.user)
           dispatch(setUser(response.user))
        }
        catch(err){
            dispatch(setError(err?.response?.data?.message || "Registration failed."))    
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    return{
        handleRegister
    }
}