import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, login, signup, logout, updateProfilePic } from './authThunks';

const initialState = {
    authUser: null,
    isSignUp: false,
    isCheckingAuth: false,
    loggedInUser: {
        username: null,
        profilePic: null,
        id: null,
        fullName: null,
    },
    toast: {
        isVisible: false,
        message: '',
        status: '', // 'success/failure
    },
    isUpdatingProfile: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup(state, action) {
            state.isSignUp = action.payload;
        },
        setToast(state, action){
            state.toast = action.payload;
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
                state.isCheckingAuth = false;
                state.toast = {
                    isVisible: true, 
                    message: 'Logged in successfully', 
                    status: 'success'
                }
            })
            .addCase(login.rejected, (state) => {
                state.isCheckingAuth = false
            })
            .addCase(signup.pending, state => {
                state.isCheckingAuth = true
            })
            .addCase(signup.fulfilled, (state) => {
                state.toast = {
                        isVisible: true, 
                        message: 'Accoount created successfully', 
                        status: 'success'
                    }
                state.isCheckingAuth = false
            })
            .addCase(signup.rejected, (state) => {
                state.isCheckingAuth = false
                console.log("Error in creating account")
            })
            .addCase(logout.fulfilled, () => {
               return {
                    ...initialState, 
                    toast: {
                        isVisible: true, 
                        message: 'Logged out successfully', 
                        status: 'success'
                    }
                }
            })
            .addCase(logout.rejected, (state) => {
                state.isCheckingAuth = false
                console.log("Error in logging out")
            })
            .addCase(updateProfilePic.pending, (state) => {
                state.isUpdatingProfile = true
            })
            .addCase(updateProfilePic.fulfilled, (state, action) => {
                state.isUpdatingProfile = false;
                state.loggedInUser.profilePic = action.payload.profilePic;
                state.toast ={
                    isVisible: true,
                    message: "Profile picture updated",
                    status: 'success'
                }
            })
            .addCase(updateProfilePic.rejected, (state, action) => {
                state.isUpdatingProfile = false;
                state.toast = {
                    isVisible: true,
                    message: action.payload,
                    status: 'error'
                }
            })
    }
})


export const authActions = authSlice.actions;

export default authSlice.reducer;