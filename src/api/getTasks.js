import { api } from "./axiosInstance";

export const getAllTasks=async(page,limit)=>{
    try {
       const {data}=await api.get(`/task/getalltasks?page=${page}&limit=${limit}`)
       return data
    } catch (error) {
        console.log(error);
    }
}