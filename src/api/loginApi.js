import { api } from "./axiosInstance";
import { useMutation } from "react-query";

export const login = async (userdata) => {
  try {
    const { data } = await api.post("/login", { ...userdata });
    
    return data;
  } catch (error) {
    console.log({error});
  }
};
export default function loginMutation({
  onSuccessCallback,
  onErrorCallback,
}){
  return useMutation({
    mutationFn:async(userData)=>{
      const {data}=await api.post("/login", { ...userData })
      sessionStorage.setItem("currentUser", JSON.stringify(data));
      return data
    },
    onSuccess:(data)=>{
      onSuccessCallback(data)
    },
    onError:(error)=>{
      console.log({error});
    }
  })
}