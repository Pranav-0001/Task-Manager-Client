import { configureStore } from '@reduxjs/toolkit'   
import userReducer from './user/userSlice.js'
import taskReducer from './user/TasksSlice.js'
import modalReducer from './user/modalSlice.js'
import socketReducer from './user/socketSlice.js'

export const store = configureStore({
    reducer: {
        user:userReducer,
        task:taskReducer,
        modal:modalReducer,
        socket:socketReducer
    },
})