import { createSlice } from '@reduxjs/toolkit';
import { getUsersList } from './userThunks';

const initialState = {
    usersList: [],
    selectedUser: null,
    isFetchingUsers: false,
    userToChat: null,
    existingUsers: []
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
            state.usersList = action.payload;
        })
        .addCase(getUsersList.rejected, (state) => {
            console.log("Error fetching users")
        })
    }
})


export const userActions = userSlice.actions;

export default userSlice.reducer;