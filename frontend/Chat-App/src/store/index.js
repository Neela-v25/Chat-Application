import { configureStore } from '@reduxjs/toolkit';
import authReducer  from '../features/auth/authSlice';
import userReducer from '../features/chat/userSlice';
import socketReducer from '../features/socket/socketSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        socket: socketReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore specific paths or actions
            ignoredActions: ['socket/connectSocket'],
            ignoredPaths: ['socket.socket'],
          },
        }),
})


export default store;