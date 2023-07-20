import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

//import { AuthResponse } from '../graphql/generated/schema';
import { RootState } from '../store';
import {
  setAccessToken,
  setRefreshToken,
  setUserEmail,
  setUserId,
} from '../../utils/local-storage';

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState: {
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    setTokenForUser: (state, { payload }: PayloadAction<any>) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      setAccessToken(payload.accessToken);
      setRefreshToken(payload.refreshToken);
    },
  },
});

export const selectCurrentUser = createSelector(
  (state: RootState) => state,
  (state) => state.authSlice
);

export const { setTokenForUser } = AuthSlice.actions;
export default AuthSlice.reducer;
