import { authRequest, authSuccess, authFailure, logoutSuccess, tokenRefreshed, userUpdated, passwordResetRequestSuccess, passwordResetRequestFailure, passwordResetSuccess, passwordResetFailure } from '../reducers/auth-reducer';
import { BASE_URL } from '../../data/constants';
import Cookies from 'js-cookie';
import { checkResponse } from '../../data/api';

export const registerUser = (email, password, name) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name })
        });
        const data = await checkResponse(response);
        if (data.success) {
            dispatch(registerSuccess({
                user: data.user,
            }));
        } else {
            dispatch(authFailure(data.success));
        }
    } catch (error) {
        dispatch(authFailure('Registration failed'));
    }
};

export const loginUser = (email, password) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await checkResponse(response);
        if (data.success) {
            dispatch(authSuccess({
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            }));
            return { success: true };
        } else {
            dispatch(authFailure('Неправильный логин или пароль'));
            return { success: false };
        }
    } catch (error) {
        dispatch(authFailure('Ошибка авторизации'));
        return { success: false };
    }
};

export const logoutUser = async (dispatch) => {
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
            dispatch(authFailure(data.success));
        }
    } catch (error) {
        dispatch(authFailure('Logout failed'));
    }
};

export const requestPasswordReset = (email) => async (dispatch) => {
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
            dispatch(passwordResetRequestFailure(data.success));
        }
    } catch (error) {
        dispatch(passwordResetRequestFailure('Failed to request password reset'));
    }
};

export const resetPassword = (password, token) => async (dispatch) => {
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
            dispatch(passwordResetFailure(data.message));
        }
    } catch (error) {
        dispatch(passwordResetFailure('Failed to reset password'));
    }
};

export const refreshToken = () => async (dispatch) => {
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
            dispatch(authFailure(data.message));
        }
    } catch (error) {
        dispatch(authFailure('Token refresh failed'));
    }
};

export const fetchUserData = () => async (dispatch) => {
    dispatch(authRequest());
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await fetch(`${BASE_URL}/auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            }
        });
        const data = await checkResponse(response);
        if (data.success) {
            dispatch(authSuccess({
                user: data.user,
                accessToken: accessToken,
                refreshToken: Cookies.get('refreshToken')
            }));
        } else {
            dispatch(authFailure('Failed to fetch user data'));
        }
    } catch (error) {
        dispatch(authFailure('Failed to fetch user data'));
    }
};

export const updateUserData = (email, name) => async (dispatch) => {
    dispatch(authRequest());
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await fetch(`${BASE_URL}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
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