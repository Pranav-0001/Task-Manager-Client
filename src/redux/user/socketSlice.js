import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
  socket: null,
};
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    emitEvent: (state, action) => {
      const { event, data } = action.payload;
      state.socket.emit(event, data); 
    },
    onEvent: (state, action) => {
      const { event, callback } = action.payload;
      state.socket.on(event, callback);
    },
  },
});

export const { setSocket, emitEvent,onEvent } = socketSlice.actions;
export default socketSlice.reducer;
