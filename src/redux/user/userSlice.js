import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  userId: "",
};

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        updateUser:(state,action)=>{
            state.userId=action.payload.userId,
            state.email=action.payload.email,
            state.username=action.payload.username
        }
    }
})

export const {updateUser}=userSlice.actions
export default userSlice.reducer