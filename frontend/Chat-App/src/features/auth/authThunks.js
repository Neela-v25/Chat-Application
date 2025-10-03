import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios';

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get("/auth/check");
            console.log(response)
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async ({username, password}, {rejectWithValue}) =>{
        try {
            const response = await axiosInstance.post("auth/login", {
                username,
                password
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const signup = createAsyncThunk(
    "auth/signup",
    async ({username, password, fullName}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("auth/signup", {
                username,
                fullName,
                password
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (_,{rejectWithValue}) => {
        try {
          const res = await axiosInstance.post("auth/logout");
          return res.status;  
        } catch (error) {
            rejectWithValue(error.response.data)
        }
    }
)

export const updateProfilePic = createAsyncThunk(
    "auth/updateProfile",
    async(data, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.put("auth/update-profile", data);
            return res.data;
        } catch (error) {
            rejectWithValue(error.response.data)
        }
    }
)