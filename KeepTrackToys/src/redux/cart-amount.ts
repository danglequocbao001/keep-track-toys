import {createSlice} from '@reduxjs/toolkit';
import storage from '../storage';

const slice = createSlice({
  name: 'cartAmount',
  initialState: {
    cartAmount: 0,
  },
  reducers: {
    update: (state: any, action: any) => {
      storage.set('cartAmount', action.payload);
      state.cartAmount = action.payload;
    },
  },
});
export const cartAmountActions = slice.actions;
export const cartAmountReducers = slice.reducer;
