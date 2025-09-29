import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
    isSignUp: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signup(state, action) {
            state.isSignUp = action.payload;
            console.log("Inside reducer..!")
        }
    }
})


const store = configureStore({
    reducer: userSlice.reducer
})

export const userActions = userSlice.actions;

export default store;