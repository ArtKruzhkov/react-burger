import { AppDispatch } from '../types';
import { BASE_URL } from '../../data/constants';
import Cookies from 'js-cookie';
import checkResponse from '../../data/api';
import {
    authRequest,
    authSuccess,
    authFailure,
    registerSuccess,
    logoutSuccess,
    tokenRefreshed,
    userUpdated,
    passwordResetRequestSuccess,
    passwordResetRequestFailure,
    passwordResetSuccess,
    passwordResetFailure
} from '../reducers/auth-reducer-slice';

interface RegisterUserData {
    user: {
        email: string;
        name: string;
    };
    success: boolean;
}

interface LoginUserData {
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
    success: boolean;
}

export const registerUser = (email: string, password: string, name: string) => async (dispatch: AppDispatch) => {
    dispatch(authRequest());
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name })
        });
        const data: RegisterUserData = await checkResponse(response);
        if (data.success) {
            dispatch(registerSuccess({
                user: data.user,
            }));
        } else {
            dispatch(authFailure('Registration failed'));
        }
    } catch (error) {
        dispatch(authFailure('Registration failed'));
    }
};

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch): Promise<{ success: boolean }> => {
    dispatch(authRequest());
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data: LoginUserData = await checkResponse(response);
        if (data.success) {
            dispatch(authSuccess({
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            }));
            return { success: true };
        } else {
            dispatch(authFailure('Invalid login or password'));
            return { success: false };
        }
    } catch (error) {
        dispatch(authFailure('Authorization error'));
        return { success: false };
    }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
    dispatch(authRequest());
    const refreshToken = Cookies.get('refreshToken');

    try {
        const response = await fetch(`${BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: refreshToken })
        });
        const data = await checkResponse(response);
        if (data.success) {
            dispatch(logoutSuccess());
        } else {
            dispatch(authFailure('Logout failed'));
        }
    } catch (error) {
        dispatch(authFailure('Logout failed'));
    }
};

export const requestPasswordReset = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(authRequest());

    try {
        const response = await fetch(`${BASE_URL}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await checkResponse(response);
        if (data.success) {
            dispatch(passwordResetRequestSuccess());
        } else {
            dispatch(passwordResetRequestFailure('Failed to send password reset request'));
        }
    } catch (error) {
        dispatch(passwordResetRequestFailure('Failed to request password reset'));
    }
};

export const resetPassword = (password: string, token: string) => async (dispatch: AppDispatch) => {
    dispatch(authRequest());

    try {
        const response = await fetch(`${BASE_URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, token })
        });
        const data = await checkResponse(response);
        if (data.success) {
            dispatch(passwordResetSuccess());
        } else {
            dispatch(passwordResetFailure('Failed to reset password'));
        }
    } catch (error) {
        dispatch(passwordResetFailure('Failed to reset password'));
    }
};

export const refreshToken = () => async (dispatch: AppDispatch) => {
    dispatch(authRequest());
    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
        dispatch(authFailure('Refresh token not found'));
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: refreshToken })
        });
        const data = await checkResponse(response);
        if (data.success) {
            dispatch(tokenRefreshed(data.accessToken));
        } else {
            dispatch(authFailure('Failed to refresh token'));
        }
    } catch (error) {
        dispatch(authFailure('Token refresh failed'));
    }
};

export const fetchUserData = () => async (dispatch: AppDispatch) => {
    dispatch(authRequest());
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await fetch(`${BASE_URL}/auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await checkResponse(response);
        if (data.success) {
            dispatch(authSuccess({
                user: data.user,
                accessToken: accessToken || '',
                refreshToken: Cookies.get('refreshToken') || ''
            }));
        } else {
            dispatch(authFailure('Failed to fetch user data'));
        }
    } catch (error) {
        dispatch(authFailure('Failed to fetch user data'));
    }
};

export const updateUserData = (email: string, name: string) => async (dispatch: AppDispatch) => {
    dispatch(authRequest());
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await fetch(`${BASE_URL}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ email, name })
        });
        const data = await checkResponse(response);
        if (data.success) {
            dispatch(userUpdated({
                user: data.user
            }));
        } else {
            dispatch(authFailure('Failed to update user data'));
        }
    } catch (error) {
        dispatch(authFailure('Failed to update user data'));
    }
};
