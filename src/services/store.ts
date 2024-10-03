import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './reducers/ingredients-slice';
import constructorSlice from './reducers/constructor-slice';
import currentIngredientSlice from './reducers/current-ingredient-slice';
import orderReducerSlice from './reducers/order-reducer-slice';
import authReducerSlice from './reducers/auth-reducer-slice';
import ordersReducer from './reducers/orders-reducer';
import { socketMiddleware } from './actions/orders-actions';

const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        constructorRed: constructorSlice,
        currentIngredient: currentIngredientSlice,
        order: orderReducerSlice,
        auth: authReducerSlice,
        orders: ordersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware())
});

export default store;

