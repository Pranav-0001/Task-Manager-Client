import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal:""
};

export const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
        updateModal:(state,action)=>{
            state.modal=action.payload.modal
        }
    }
})

export const {updateModal}=modalSlice.actions
export default modalSlice.reducer