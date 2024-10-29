import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from './types';

// initialState
const initialState: InitialState = {
    token: null,
    user: null,
    isLoading: false
};

// create auth slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // action to handle user login
        userLoggedIn: (state, action: PayloadAction<Omit<InitialState, 'isLoading'>>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isLoading = false;
        },

        // action to handle user logout
        userLoggedOut: (state) => {
            state.token = null;
            state.user = null;
            state.isLoading = false;
        },

        // action to set isLoading state
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
});

// export actions
export const { userLoggedIn, userLoggedOut, setLoading } = authSlice.actions;

// export reducer
export default authSlice.reducer;
