// import { configureStore } from '@reduxjs/toolkit';
// import ingredientsReducer from './reducers/ingredients-reducer';
// import constructorReducer from './reducers/constructor-reducer';
// import currentIngredientReducer from './reducers/current-ingredient-reducer';
// import orderReducer from './reducers/order-reducer';

// const store = configureStore({
//     reducer: {
//         ingredients: ingredientsReducer,
//         constructor: constructorReducer,
//         currentIngredient: currentIngredientReducer,
//         order: orderReducer
//     },
// });

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredients-reducer';
import constructorReducer from './reducers/constructor-reducer';
import currentIngredientReducer from './reducers/current-ingredient-reducer';
import orderReducer from './reducers/order-reducer';
import { thunk } from 'redux-thunk';

const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        constructorReducer: constructorReducer,
        currentIngredient: currentIngredientReducer,
        orderReducer: orderReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;
