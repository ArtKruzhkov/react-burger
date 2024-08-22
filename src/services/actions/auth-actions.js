import { authRequest, authSuccess, authFailure, logoutSuccess, tokenRefreshed } from '../reducers/auth-reducer';
import { BASE_URL } from '../../data/constants'; // URL, к которому будут отправляться запросы
import Cookies from 'js-cookie';

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
        const data = await response.json();
        if (data.success) {
            dispatch(authSuccess({
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
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
        const data = await response.json();
        console.log('Login response:', data);
        if (data.success) {
            dispatch(authSuccess({
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            }));
        } else {
            dispatch(authFailure(data.success));
        }
    } catch (error) {
        dispatch(authFailure('Login failed'));
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
        const data = await response.json();
        if (data.success) {
            dispatch(logoutSuccess());
            Cookies.remove('refreshToken');
        } else {
            dispatch(authFailure(data.success));
        }
    } catch (error) {
        dispatch(authFailure('Logout failed'));
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
        const data = await response.json();
        if (data.success) {
            dispatch(tokenRefreshed(data.accessToken));
        } else {
            dispatch(authFailure(data.message));
        }
    } catch (error) {
        dispatch(authFailure('Token refresh failed'));
    }
};


