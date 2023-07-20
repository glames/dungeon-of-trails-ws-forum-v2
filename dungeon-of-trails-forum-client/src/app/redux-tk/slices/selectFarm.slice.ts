// mySlice.js
import { createSlice } from '@reduxjs/toolkit';

const selectFarm = createSlice({
  name: 'selectFarm',
  initialState: { selectedFarm: '' },
  reducers: {
    setSelectedFarm: (state, action) => {
      state.selectedFarm = action.payload;
    }
  }
});

export const { setSelectedFarm } = selectFarm.actions;
export default selectFarm.reducer;
