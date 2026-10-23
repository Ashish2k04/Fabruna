import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export async function register({email, password, contact, fullname}){
     try{
        const response = await api.post("/api/auth/register",{email, password, contact, fullname})
        console.log(response.data)
        return response.data
     }
     catch(err){
        console.log(err);
     }
}