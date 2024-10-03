import type { Middleware, MiddlewareAPI } from 'redux';
import type { TApplicationActions, AppDispatch, RootState } from '../types';

interface TWsActions {
    wsInit: (payload: string) => TApplicationActions;
    wsClose: () => TApplicationActions;
    onOpen: () => TApplicationActions;
    onClose: () => TApplicationActions;
    onError: (event: string) => TApplicationActions;
    onMessage: (data: any) => TApplicationActions;
}

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === wsActions.wsInit(payload).type) {
                const wsUrl = payload as string;
                socket = new WebSocket(wsUrl);
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(wsActions.onOpen());
                };

                socket.onerror = (event: Event) => {
                    dispatch(wsActions.onError(event.type));
                };

                socket.onmessage = (event: MessageEvent) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    if (parsedData.message === 'Invalid or missing token') {
                        dispatch(wsActions.onError(event.type));
                        socket?.close();
                        window.location.href = '/login';
                    } else {
                        dispatch(wsActions.onMessage(parsedData));
                    }
                };
            }

            if (type === wsActions.wsClose().type) {
                socket?.close();
                socket = null;
            }

            next(action);
        };
    }) as Middleware;
};
