import { ThunkAction } from 'redux-thunk';
import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import { ActionCreator } from 'redux';
import { Action } from 'redux';
import store from '../store2';
import { IAuthActions } from '../reducers/auth-reducer-slice';
import { IConstructorActions } from '../reducers/constructor-slice';
import { ICurrentIngredientActions } from '../reducers/current-ingredient-slice';
import { IIngredientsActions } from '../reducers/ingredients-slice';
import { IOrderActions } from '../reducers/order-reducer-slice';
import { useDispatch } from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = IAuthActions |
    IConstructorActions |
    ICurrentIngredientActions |
    IIngredientsActions |
    IOrderActions;


// export type AppThunk<TReturn = void> = ActionCreator<
//     ThunkAction<TReturn, Action, RootState, TApplicationActions>
// >;

// export type AppDispatch = Dispatch<TApplicationActions>;



export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TApplicationActions>;

export const useAppDispatch: () => AppDispatch = useDispatch;