import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './reducers/ingredients-slice';
import constructorSlice from './reducers/constructor-slice';
import orderReducerSlice from './reducers/order-reducer-slice';
import authReducerSlice from './reducers/auth-reducer-slice';
import ordersReducer, {
    wsConnectionStart,
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionSuccess,
    wsGetMessage
} from './reducers/orders-reducer';
import { socketMiddleware } from './actions/orders-actions';

const wsActions = {
    wsInit: wsConnectionStart,
    wsClose: wsConnectionClosed,
    onOpen: wsConnectionSuccess,
    onClose: wsConnectionClosed,
    onError: wsConnectionError,
    onMessage: wsGetMessage,
};

const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        constructorRed: constructorSlice,
        order: orderReducerSlice,
        auth: authReducerSlice,
        orders: ordersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware(wsActions))
});

export default store;