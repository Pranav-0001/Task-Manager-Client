import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../validation/formValidationSchema";
import { signupApi } from "../api/signupApi";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [error,setError]=useState({email:"",username:"",password:""})
    
    const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const onSubmitHandler = async(data) => {
     const user=await signupApi(data)
    if(!user.error){
        navigate('/')
    }else{
       if(user.email) setError({...error,email:user.email});
    }   
    
  };

  return (
    <div className="pt-16 flex justify-center items-center h-[100vh]">
      <form
        className="shadow border p-10"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h1 className="text-center font-bold text-2xl pb-8">Register</h1>
        <p>Email</p>

        <input
          {...register("email")}
          placeholder="email"
          type="text"
          className="border rounded px-2 py-1 outline-none"
        />
        <p className="text-xs text-red-800">{errors.email?.message||error.email}</p>
        <p>Username</p>

        <input
          {...register("username")}
          placeholder="email"
          type="text"
          className="border rounded px-2 py-1 outline-none"
        />
        <p className="text-xs text-red-800">{errors.username?.message}</p>
        <p>Password</p>

        <input
          {...register("password")}
          placeholder="password"
          type="password"
          className="border rounded px-2 py-1 outline-none"
        />
        <p className="text-xs text-red-800">{errors.password?.message}</p>
        <br />
        <input
          className="border px-2 py-1 bg-blue-500 rounded text-white"
          type="submit"
        />
      </form>
    </div>
  );
}
