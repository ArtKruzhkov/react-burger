import type { Middleware, MiddlewareAPI } from 'redux';
import type { TApplicationActions, AppDispatch, RootState } from '../types';
import {
    wsConnectionStart,
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage,
} from '../reducers/orders-reducer';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === wsConnectionStart.type) {
                const wsUrl = payload as string;
                socket = new WebSocket(wsUrl);
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(wsConnectionSuccess());
                };

                socket.onerror = event => {
                    dispatch(wsConnectionError(event));
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    if (parsedData.message === 'Invalid or missing token') {
                        dispatch(wsConnectionError(event));
                        dispatch(wsConnectionClosed());
                        socket?.close();
                        window.location.href = '/login';
                    } else {
                        dispatch(wsGetMessage(parsedData));
                    }
                };

                socket.onclose = () => {
                    dispatch(wsConnectionClosed());
                };
            }

            next(action);
        };
    }) as Middleware;
};
