import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        authSuccess: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.loading = false;

            Cookies.set('refreshToken', action.payload.refreshToken, { expires: 7 });
        },
        authFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            // Удаляем refreshToken из куки
            Cookies.remove('refreshToken');
        },
        tokenRefreshed: (state, action) => {
            state.accessToken = action.payload.accessToken;
        }
    }
});

export const { authRequest, authSuccess, authFailure, logoutSuccess, tokenRefreshed } = authSlice.actions;
export default authSlice.reducer;

