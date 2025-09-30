import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, login, signup, logout } from './authThunks';

const initialState = {
    authUser: null,
    isSignUp: false,
    isCheckingAuth: false,
    loggedInUser: {
        username: null,
        profilePic: null,
        id: null,
        fullName: null,
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup(state, action) {
            state.isSignUp = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isCheckingAuth = false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.authUser = null;
                state.isCheckingAuth = false;
            })
            .addCase(login.pending, state => {
                state.isCheckingAuth = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loggedInUser = action.payload;
                console.log(action.payload);
                state.isCheckingAuth = false
            })
            .addCase(login.rejected, (state) => {
                state.isCheckingAuth = false
            })
            .addCase(signup.pending, state => {
                state.isCheckingAuth = true
            })
            .addCase(signup.fulfilled, (state) => {
                console.log("Account created");
                state.isCheckingAuth = false
            })
            .addCase(signup.rejected, (state) => {
                state.isCheckingAuth = false
                console.log("Error in creating account")
            })
            .addCase(logout.fulfilled, (state) => {
                console.log("Logged out");
                state.loggedInUser = {}
                state.authUser = false
            })
            .addCase(logout.rejected, (state) => {
                state.isCheckingAuth = false
                console.log("Error in logging out")
            })
    }
})


export const authActions = authSlice.actions;

export default authSlice.reducer;