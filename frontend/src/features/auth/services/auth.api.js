import axios from "axios";

const authApi = axios.create({
   baseURL: "http://localhost:3000/api/auth",
   withCredentials: true
});

export async function register({ email, password, contact, fullName, isSeller }) {
   try {
      const response = await authApi.post("/register", { email, password, contact, fullName, isSeller });
      return response.data;
   }
   catch (err) {
      console.log(err.response?.data);
      throw err;
   }
}

export async function login({email, password}) {
   try{
      const response = await authApi.post("/login", {email, password});
      return response.data;
   }
   catch(err){
      console.log(err.response?.data);
      throw err;
   }
}