import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
    orderNumber: number | null;
    orderName: string;
}

const initialState: OrderState = {
    orderNumber: null,
    orderName: '',
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder(state, action: PayloadAction<{ orderNumber: number, orderName: string }>) {
            state.orderNumber = action.payload.orderNumber;
            state.orderName = action.payload.orderName;
        },
        clearOrder(state) {
            state.orderNumber = null;
            state.orderName = '';
        },
    },
});

export type IOrderActions =
    | ReturnType<typeof setOrder>
    | ReturnType<typeof clearOrder>;


export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;