import { api } from "./axiosInstance";

export const getUserById=async(userId)=>{
    try {
       const {data}=await api.get(`/getuserbyid/${userId}`) 
       return data
    } catch (error) {
        console.log({error});
    }
}