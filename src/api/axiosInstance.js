import axios from "axios";

export const api=axios.create({
    baseURL:"http://localhost:3000/"
})

api.interceptors.request.use(
    (config)=>{
      let token=sessionStorage.getItem("currentUser")
      token=JSON.parse(token)?.token
      if(token) config.headers['authorization']=`Bearer ${token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )