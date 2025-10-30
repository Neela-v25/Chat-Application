import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { socketActions } from "../socket/socketSlice.js";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axiosInstance.get("/auth/check");
      dispatch(socketActions.connectSocket(response.data._id));

      const socket = getState().socket.socket;
      if (socket) {
        socket.on("getOnlineUsers", (userIds) => {
          dispatch(socketActions.setOnlineUsers(userIds));
        });
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/login", {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ username, password, fullName }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/signup", {
        username,
        fullName,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post("auth/logout");
      dispatch(socketActions.disconnectSocket());
      return res.status;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const updateProfilePic = createAsyncThunk(
  "auth/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put("auth/update-profile", data);
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
