import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../lib/axios';

const initialState = {
    authUser: null,
    isSignUp: false,
    isCheckingAuth: false,
}

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

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signup(state, action) {
            state.isSignUp = action.payload;
            console.log("Inside reducer..!")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, state => {
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
    }
})


const store = configureStore({
    reducer: userSlice.reducer
})

export const userActions = userSlice.actions;

export default store;