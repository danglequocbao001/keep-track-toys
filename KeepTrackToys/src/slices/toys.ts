import {createSlice} from '@reduxjs/toolkit';

type ISetting = {};

const initialState: ISetting = {};

const slice = createSlice({
  name: 'toys',
  initialState,
  reducers: {},
});

export const toysActions = slice.actions;
export const toysReducers = slice.reducer;
