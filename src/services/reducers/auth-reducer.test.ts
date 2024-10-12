import reducer, {
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
    passwordResetFailure,
} from './auth-reducer-slice';

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


describe('authSlice reducer', () => {

    it('should handle authRequest', () => {
        const expectedState = {
            ...initialState,
            loading: true,
            error: null,
        };
        expect(reducer(initialState, authRequest())).toEqual(expectedState);
    });

    it('should handle authSuccess', () => {
        const user = { email: 'test@example.com', name: 'Test User' };
        const accessToken = 'access-token';
        const refreshToken = 'refresh-token';

        const expectedState = {
            ...initialState,
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            loading: false,
        };
        expect(reducer(initialState, authSuccess({ user, accessToken, refreshToken }))).toEqual(expectedState);
    });

    it('should handle authFailure', () => {
        const error = 'Authentication failed';
        const expectedState = {
            ...initialState,
            loading: false,
            error,
        };
        expect(reducer(initialState, authFailure(error))).toEqual(expectedState);
    });

    it('should handle registerSuccess', () => {
        const user = { email: 'test@example.com', name: 'Test User' };
        const expectedState = {
            ...initialState,
            user,
            loading: false,
        };
        expect(reducer(initialState, registerSuccess({ user }))).toEqual(expectedState);
    });

    it('should handle logoutSuccess', () => {
        const initialStateWithUser = {
            ...initialState,
            user: { email: 'test@example.com', name: 'Test User' },
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
            isAuthenticated: true,
        };
        const expectedState = {
            ...initialState,
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
        };
        expect(reducer(initialStateWithUser, logoutSuccess())).toEqual(expectedState);
    });

    it('should handle tokenRefreshed', () => {
        const initialStateWithToken = {
            ...initialState,
            accessToken: 'old-token',
        };
        const newAccessToken = 'new-token';
        const expectedState = {
            ...initialStateWithToken,
            accessToken: newAccessToken,
        };
        expect(reducer(initialStateWithToken, tokenRefreshed({ accessToken: newAccessToken }))).toEqual(expectedState);
    });

    it('should handle userUpdated', () => {
        const updatedUser = { email: 'new@example.com', name: 'New User' };
        const initialStateWithUser = {
            ...initialState,
            user: { email: 'test@example.com', name: 'Test User' },
        };
        const expectedState = {
            ...initialStateWithUser,
            user: updatedUser,
        };
        expect(reducer(initialStateWithUser, userUpdated({ user: updatedUser }))).toEqual(expectedState);
    });

    it('should handle passwordResetRequestSuccess', () => {
        const expectedState = {
            ...initialState,
            passwordResetRequestSent: true,
            loading: false,
        };
        expect(reducer(initialState, passwordResetRequestSuccess())).toEqual(expectedState);
    });

    it('should handle passwordResetRequestFailure', () => {
        const error = 'Failed to send reset request';
        const expectedState = {
            ...initialState,
            passwordResetRequestSent: false,
            error,
            loading: false,
        };
        expect(reducer(initialState, passwordResetRequestFailure(error))).toEqual(expectedState);
    });

    it('should handle passwordResetSuccess', () => {
        const expectedState = {
            ...initialState,
            passwordResetSuccess: true,
            loading: false,
        };
        expect(reducer(initialState, passwordResetSuccess())).toEqual(expectedState);
    });

    it('should handle passwordResetFailure', () => {
        const error = 'Password reset failed';
        const expectedState = {
            ...initialState,
            passwordResetSuccess: false,
            error,
            loading: false,
        };
        expect(reducer(initialState, passwordResetFailure(error))).toEqual(expectedState);
    });
});
