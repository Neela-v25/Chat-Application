import { createSlice } from '@reduxjs/toolkit';
import { getFriendsList, getMessages, getUsersList, sendMessage } from './userThunks';
import { logout } from '../auth/authThunks';

const initialState = {
    usersList: [],
    selectedUser: null,
    isFetchingUsers: false,
    userToChat: null,
    existingUsers: [],
    messageHistory: [],
    isMessagesLoading: false, 
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedUser(state, action) {
            state.selectedUser = action.payload;
        },
        setUserToChat(state, action){
            state.userToChat = action.payload;
            state.existingUsers.unshift(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUsersList.pending, (state) => {
            state.isFetchingUsers = true;
        })
        .addCase(getUsersList.fulfilled, (state, action)=>{
            state.isFetchingUsers = false;
            state.usersList = action.payload.filter(user => !state.existingUsers.some(item => item._id === user._id))
        })
        .addCase(getUsersList.rejected, () => {
            console.log("Error fetching users")
        })
        .addCase(sendMessage.pending, () => {

        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            state.messageHistory.push(action.payload);
        })
        .addCase(sendMessage.rejected, () => {

        })
        .addCase(getMessages.pending, (state) => {
            state.isMessagesLoading = true;
            state.messageHistory = [];
        })
        .addCase(getMessages.fulfilled, (state, action)=>{
            state.messageHistory = action.payload;
            state.isMessagesLoading = false;
        })
        .addCase(getMessages.rejected, (state, action)=>{
            console.log(action.payload)
        })
        .addCase(logout.fulfilled, () => {
            return initialState
        })
        .addCase(getFriendsList.pending, (state) => {
            state.isFetchingUsers = true;
        })
        .addCase(getFriendsList.fulfilled, (state, action) => {
            state.isFetchingUsers = false;
            state.existingUsers = action.payload;
        })
    }
})


export const userActions = userSlice.actions;

export default userSlice.reducer;