import {createSlice} from '@reduxjs/toolkit';
import storage from './storage';

export const toyListSlice = createSlice({
  name: 'toys',
  initialState: {
    id: '',
    toyName: '',
    toySpecies: '',
    toyDescription: '',
  },
  reducers: {
    update: (state: any, action: any) => {
      const {toyName, toySpecies, toyDescription} = action.payload;
      storage.set('toyName', toyName);
      storage.set('toySpecies', toySpecies);
      storage.set('toyDescription', toyDescription);
      state.toyName = toyName;
      state.toySpecies = toySpecies;
      state.toyDescription = toyDescription;
    },
  },
  //   extraReducers: build => {
  //     build.addCase(getAll.fulfilled, (state, action) => {
  //       state.toyName = action.payload;
  //     });
  //   },
});

export const {update} = toyListSlice.actions;
// export const selectToy = (state: any) => state.toys.value
export default toyListSlice.reducer;
