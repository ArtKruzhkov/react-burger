import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface User {
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    passwordResetSuccess: boolean;
    passwordResetRequestSent: boolean;
}

const initialState: AuthState = {
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
        authSuccess: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.loading = false;
            Cookies.set('refreshToken', action.payload.refreshToken, { expires: 7 });
            localStorage.setItem('accessToken', action.payload.accessToken);
        },
        registerSuccess: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
            state.loading = false;
        },
        authFailure: (state, action: PayloadAction<string>) => {
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
        tokenRefreshed: (state, action: PayloadAction<{ accessToken: string }>) => {
            state.accessToken = action.payload.accessToken;
        },
        userUpdated: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
        },
        passwordResetRequestSuccess: (state) => {
            state.passwordResetRequestSent = true;
            state.loading = false;
        },
        passwordResetRequestFailure: (state, action: PayloadAction<string>) => {
            state.passwordResetRequestSent = false;
            state.error = action.payload;
            state.loading = false;
        },
        passwordResetSuccess: (state) => {
            state.passwordResetSuccess = true;
            state.loading = false;
        },
        passwordResetFailure: (state, action: PayloadAction<string>) => {
            state.passwordResetSuccess = false;
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    authRequest,
    authSuccess,
    registerSuccess,
    authFailure,
    logoutSuccess,
    tokenRefreshed,
    userUpdated,
    passwordResetRequestSuccess,
    passwordResetRequestFailure,
    passwordResetSuccess,
    passwordResetFailure,
} = authSlice.actions;

export type IAuthActions =
    | ReturnType<typeof authRequest>
    | ReturnType<typeof authSuccess>
    | ReturnType<typeof registerSuccess>
    | ReturnType<typeof authFailure>
    | ReturnType<typeof logoutSuccess>
    | ReturnType<typeof tokenRefreshed>
    | ReturnType<typeof userUpdated>
    | ReturnType<typeof passwordResetRequestSuccess>
    | ReturnType<typeof passwordResetRequestFailure>
    | ReturnType<typeof passwordResetSuccess>
    | ReturnType<typeof passwordResetFailure>;

export default authSlice.reducer;
