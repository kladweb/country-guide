import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataLoadState: 0, // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
  dataLoadError: null,
  page: null,
  data: null,
  currentData: null,
  countPages: null,
}

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    updateLoadState: (state, action) => {
      state.dataLoadState = action.payload.state;
      state.dataLoadError = action.payload.error;
    },
    updateData: (state, action) => {
      state.data = action.payload;
      state.countPages = Math.ceil(state.data.length / 10);
    },
    updateCurrentData: (state, action) => {
      if (action.payload.page === 'all') {
        state.currentData = action.payload.data;
      } else {
        if (action.payload.page !== 'visited') {
          state.currentData = action.payload.data.slice((action.payload.page - 1) * 10, action.payload.page * 10);
        }
      }
    }
  }
});

export const {
  updateLoadState,
  updateData,
  updateCurrentData
} = countriesSlice.actions;

export default countriesSlice.reducer;
