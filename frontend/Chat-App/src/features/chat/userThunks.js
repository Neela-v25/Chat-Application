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

export const getMessages = createAsyncThunk(
    "message/getMessages",
    async(receiverId, { rejectWithValue }) =>{
        try {
            const res = await axiosInstance.get(`/message/${receiverId}`)
            return res.data;
        } catch (error) {
            rejectWithValue(error.response.data)
        }
    }
)

export const sendMessage = createAsyncThunk(
    "message/sendMessage",
    async(data, { rejectWithValue }) => {
        const { receiverId } = data;
        try {
            const res = await axiosInstance.post(`/message/send/${receiverId}`, data);
            return res.data;
        } catch (error) {
           rejectWithValue(error.response.data); 
        }
    }
)

export const getFriendsList = createAsyncThunk(
    "message/getFriendsList",
    async(loggedInUser, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/message/${loggedInUser}/users`);
            return res.data;
        } catch (error) {
            rejectWithValue(error.response.data)
        }
    }
)