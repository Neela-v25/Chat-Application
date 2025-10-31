import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.mode === "development" ? "http://localhost:5001/api" : "/api";

const initialState = {
  socket: null,
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connectSocket: (state, action) => {
      const userId = action.payload;
      const socket = io(BASE_URL, { query: { userId } });
      socket.connect();
      state.socket = socket;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    disconnectSocket: (state) => {
      if (state.socket?.connected) {
        state.socket.disconnect();
      }
      state.socket = null;
      state.onlineUsers = [];
    }
  },
});

export const socketActions = socketSlice.actions;
export default socketSlice.reducer;
