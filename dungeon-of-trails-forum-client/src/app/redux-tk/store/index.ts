import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import authReducer from '~/app/redux-tk/slices/auth.slice';
import currentUserReducer from '../slices/currenUser.slice';
import selectFarm from '../slices/selectFarm.slice';

export const store = configureStore({
  reducer: {
    authSlice: authReducer,
    selectFarm: selectFarm,
    currentUserSlice: currentUserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
