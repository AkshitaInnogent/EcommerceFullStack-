import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    setOrders: (state, action) => action.payload,
    addOrder: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setOrders, addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;