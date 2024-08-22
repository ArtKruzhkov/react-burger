import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredients-reducer';
import constructorReducer from './reducers/constructor-reducer';
import currentIngredientReducer from './reducers/current-ingredient-reducer';
import orderReducer from './reducers/order-reducer';
import authReducer from './reducers/auth-reducer';
import { thunk } from 'redux-thunk';

const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        constructorReducer: constructorReducer,
        currentIngredient: currentIngredientReducer,
        orderReducer: orderReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;
