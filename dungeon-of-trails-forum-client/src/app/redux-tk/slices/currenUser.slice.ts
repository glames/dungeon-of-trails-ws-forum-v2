import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

//import { AuthResponse } from '../graphql/generated/schema';
import { RootState } from '../store';
import {
  setUserAvatarURL,
  setUserEmail,
  setUserId,
  setUserName,
} from '../../utils/local-storage';

const CurrentUserSlice = createSlice({
  name: 'currentUserSlice',
  initialState: {
    userEmail: '',
    userId: '',
    name: '',
    avatarUrl: '',
  },
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<any>) => {
      state.userEmail = payload.userEmail;
      state.userId = payload.userId;
      state.name = payload.name;
      state.avatarUrl = payload.avatarUrl;
      setUserEmail(payload.userEmail);
      setUserId(payload.userId);
      setUserName(payload.name);
      setUserAvatarURL(payload.avatarUrl);
    },
  },
});

export const selectCurrentUser = createSelector(
  (state: RootState) => state,
  (state) => state.currentUserSlice
);

export const { setCurrentUser } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
