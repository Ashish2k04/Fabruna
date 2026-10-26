import axios from "axios";

const authApi = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
});

export async function register({email, password, contact, fullname, isSeller}) {
     try{
        const response = await authApi.post("/register",{email, password, contact, fullname, isSeller})
        console.log(response.data)
        return response.data
     }
     catch(err){
        console.log(err);
     }
}