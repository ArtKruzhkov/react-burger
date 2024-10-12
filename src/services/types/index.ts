import { ThunkAction } from 'redux-thunk';
import { ThunkDispatch } from 'redux-thunk';
import store from '../store';
import { IAuthActions } from '../reducers/auth-reducer-slice';
import { IConstructorActions } from '../reducers/constructor-slice';
import { IIngredientsActions } from '../reducers/ingredients-slice';
import { IOrderActions } from '../reducers/order-reducer-slice';
import { IOrdersActions } from '../reducers/orders-reducer';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export type TApplicationActions = IAuthActions |
    IConstructorActions |
    IIngredientsActions |
    IOrderActions |
    IOrdersActions;

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TApplicationActions>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;