import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
    _id: string;
    number: number;
    ingredients: string[];
    name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface OrdersState {
    orders: Order[];
    total: number;
    totalToday: number;
    wsConnected: boolean;
    error?: Event;
}


const initialState: OrdersState = {
    orders: [],
    total: 0,
    totalToday: 0,
    wsConnected: false,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        wsConnectionStart: (state, action: PayloadAction<string>) => {
            state.wsConnected = true;
        },
        wsConnectionSuccess: (state) => {
            state.wsConnected = true;
        },
        wsConnectionError: (state, action: PayloadAction<Event>) => {
            state.wsConnected = false;
            state.error = action.payload;
        },
        wsConnectionClosed: (state) => {
            state.wsConnected = false;
        },
        wsGetMessage: (
            state,
            action: PayloadAction<{ orders: Order[]; total: number; totalToday: number }>
        ) => {
            const { orders, total, totalToday } = action.payload;
            state.orders = orders;
            state.total = total;
            state.totalToday = totalToday;
        },
    },
});

export type IOrdersActions =
    | ReturnType<typeof wsConnectionStart>
    | ReturnType<typeof wsConnectionSuccess>
    | ReturnType<typeof wsConnectionError>
    | ReturnType<typeof wsConnectionClosed>
    | ReturnType<typeof wsGetMessage>;

export const {
    wsConnectionStart,
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage,
} = ordersSlice.actions;

export default ordersSlice.reducer;