// import { configureStore } from '@reduxjs/toolkit';
// import ingredientsSlice from './reducers/ingredients-slice';
// import constructorSlice from './reducers/constructor-slice';
// import currentIngredientSlice from './reducers/current-ingredient-slice';
// import orderReducerSlice from './reducers/order-reducer-slice';
// import authReducerSlice from './reducers/auth-reducer-slice';
// import thunk from 'redux-thunk';

// const store = configureStore({
//     reducer: {
//         ingredients: ingredientsSlice,
//         constructorRed: constructorSlice,
//         currentIngredient: currentIngredientSlice,
//         order: orderReducerSlice,
//         auth: authReducerSlice
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
// });

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './reducers/ingredients-slice';
import constructorSlice from './reducers/constructor-slice';
import currentIngredientSlice from './reducers/current-ingredient-slice';
import orderReducerSlice from './reducers/order-reducer-slice';
import authReducerSlice from './reducers/auth-reducer-slice';

const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        constructorRed: constructorSlice,
        currentIngredient: currentIngredientSlice,
        order: orderReducerSlice,
        auth: authReducerSlice
    },
    // thunk уже включен по умолчанию, так что его не нужно явно добавлять
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;
