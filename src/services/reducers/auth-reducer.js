import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    passwordResetSuccess: false,
    passwordResetRequestSent: false,
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
            localStorage.setItem('accessToken', action.payload.accessToken);
        },
        registerSuccess: (state, action) => {
            state.user = action.payload.user;
            state.loading = false;
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
            Cookies.remove('refreshToken');
            localStorage.removeItem('accessToken');
        },
        tokenRefreshed: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
        userUpdated: (state, action) => {
            state.user = action.payload.user;
        },
        passwordResetRequestSuccess: (state) => {
            state.passwordResetRequestSent = true;
            state.loading = false;
        },
        passwordResetRequestFailure: (state, action) => {
            state.passwordResetRequestSent = false;
            state.error = action.payload;
            state.loading = false;
        },
        passwordResetSuccess: (state) => {
            state.passwordResetSuccess = true;
            state.loading = false;
        },
        passwordResetFailure: (state, action) => {
            state.passwordResetSuccess = false;
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const {
    authRequest,
    authSuccess,
    authFailure,
    logoutSuccess,
    tokenRefreshed,
    userUpdated,
    passwordResetRequestSuccess,
    passwordResetRequestFailure,
    passwordResetSuccess,
    passwordResetFailure,
} = authSlice.actions;

export default authSlice.reducer;