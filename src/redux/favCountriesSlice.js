import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
}

export const favCountriesSlice = createSlice({
  name: 'favCountries',
  initialState,
  reducers: {
    updateFavData: (state, action) => {
      state.data = action.payload;
      window.localStorage.setItem('favCountries', JSON.stringify(action.payload));
    },
  }
});

export const {updateFavData} = favCountriesSlice.actions;

export default favCountriesSlice.reducer;