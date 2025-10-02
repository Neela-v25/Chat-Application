import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";


export const getUsersList = createAsyncThunk(
    'user/usersList',
    async (_, { rejectWithValue}) => {
        try{
            const res = await axiosInstance.get('/message/users');
            console.log(res.data)
            return res.data;
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
)