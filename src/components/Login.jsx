import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/formValidationSchema";
import loginMutation, { login } from "../api/loginApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error,setError]=useState({email:"",username:"",password:""})
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const userLoginMutn=loginMutation({
    onSuccessCallback:(data)=>{
      console.log({su:data});
      navigate('/')
      return
    },
    onErrorCallback:(error)=>{
      console.log(error);
    }
  })

  const onSubmitHandler = async(data) => {

    userLoginMutn.mutate({
      email:data.email,
      password:data.password
    })

  };

  return (
    <div className="pt-16 flex justify-center items-center h-[100vh]">
      <form className="shadow border p-10" onSubmit={handleSubmit(onSubmitHandler)}>
        <h1 className="text-center font-bold text-2xl pb-8">Login</h1>
        <p>Email</p>

        <input
          {...register("email")}
          placeholder="email"
          type="email"
          className="border rounded px-2 py-1 outline-none"
        />
        <p className="text-xs text-red-800">{errors.email?.message}</p>
        <p>Password</p>

        <input
          {...register("password")}
          placeholder="password"
          type="password"
          className="border rounded px-2 py-1 outline-none"
        />
        <p className="text-xs text-red-800">{errors.password?.message}</p>
        <br />
        <input className="border px-2 py-1 bg-blue-500 rounded text-white" type="submit" />
      </form>
    </div>
  );
}
