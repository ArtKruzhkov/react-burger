// orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определите тип состояния
interface OrderState {
    orderNumber: number | null;
    orderName: string;
}

// Начальное состояние
const initialState: OrderState = {
    orderNumber: null,
    orderName: '',
};

// Создайте слайс
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

// Экспортируйте действия и редюсер
export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
