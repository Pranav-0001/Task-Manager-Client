import { json } from "react-router-dom";
import { api } from "./axiosInstance";

export const signupApi = async(userdata) => {
  try {
    
    const {data}=await api.post('/signup',{...userdata})
    console.log(data);
    sessionStorage.setItem("currentUser",JSON.stringify(data))
    return data.user
  } catch (error) {
    const {data}=error.response
    if(data.email){
        return {error:true,email:data.email}
    }
  }
};