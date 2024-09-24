// import { ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR, UPDATE_INGREDIENT_ORDER, CLEAR_CONSTRUCTOR } from "../actions/constructor-actions";

// const initialState = {
//     ingredients: [],
//     ingredientCounts: {}
// };

// const constructorReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_INGREDIENT_TO_CONSTRUCTOR: {
//             const ingredient = action.payload;
//             const ingredientId = ingredient._id;

//             if (ingredient.type === undefined || ingredient.type === null) {
//                 return state;
//             }

//             if (ingredient.type === 'bun') {
//                 const filteredIngredients = state.ingredients.filter(item => item.type !== 'bun');
//                 const newIngredientCounts = { ...state.ingredientCounts };

//                 state.ingredients.forEach(item => {
//                     if (item.type === 'bun') {
//                         newIngredientCounts[item._id] = 0;
//                     }
//                 });

//                 return {
//                     ...state,
//                     ingredients: [ingredient, ...filteredIngredients, ingredient],
//                     ingredientCounts: {
//                         ...newIngredientCounts,
//                         [ingredientId]: 2
//                     }
//                 };
//             } else {
//                 const updatedIngredients = [...state.ingredients, ingredient];
//                 const updatedIngredientCounts = {
//                     ...state.ingredientCounts,
//                     [ingredientId]: (state.ingredientCounts[ingredientId] || 0) + 1
//                 };

//                 return {
//                     ...state,
//                     ingredients: updatedIngredients,
//                     ingredientCounts: updatedIngredientCounts
//                 };
//             }
//         }
//         case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
//             const uniqueId = action.payload;
//             const ingredientIndex = state.ingredients.findIndex(ingredient => ingredient.uniqueId === uniqueId);

//             if (ingredientIndex === -1) {
//                 return state;
//             }

//             const updatedIngredients = [
//                 ...state.ingredients.slice(0, ingredientIndex),
//                 ...state.ingredients.slice(ingredientIndex + 1)
//             ];

//             const removedIngredient = state.ingredients[ingredientIndex];
//             const updatedIngredientCounts = { ...state.ingredientCounts };

//             if (removedIngredient) {
//                 const ingredientId = removedIngredient._id;

//                 if (removedIngredient.type === 'bun') {
//                     updatedIngredients.forEach((ingredient) => {
//                         if (ingredient.type === 'bun') {
//                             updatedIngredientCounts[ingredient._id] = 0;
//                         }
//                     });
//                 } else {
//                     updatedIngredientCounts[ingredientId] = (updatedIngredientCounts[ingredientId] || 0) - 1;

//                     if (updatedIngredientCounts[ingredientId] <= 0) {
//                         delete updatedIngredientCounts[ingredientId];
//                     }
//                 }
//             }

//             return {
//                 ...state,
//                 ingredients: updatedIngredients,
//                 ingredientCounts: updatedIngredientCounts
//             };
//         }
//         case UPDATE_INGREDIENT_ORDER: {
//             return {
//                 ...state,
//                 ingredients: action.payload
//             };
//         }
//         case CLEAR_CONSTRUCTOR: {
//             return initialState;
//         }
//         default:
//             return state;
//     }
// };

// export default constructorReducer;
