import {combineReducers, configureStore} from '@reduxjs/toolkit';
import toyListSlice from './toyListSlice';

const rootReducer = combineReducers({
  userList: toyListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;