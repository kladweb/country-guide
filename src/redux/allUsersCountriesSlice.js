import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allCountriesLoadState: 0,
  allCountries: [],
}

export const allUsersCountriesSlice = createSlice({
    name: 'allUsersCountries',
    initialState,
    reducers: {
      updateAllUsersCountries: (state, action) => {
        state.allCountries = action.payload;
        state.allCountriesLoadState = 2;
      }
    }
  }
)

export const {updateAllUsersCountries} = allUsersCountriesSlice.actions;

export default allUsersCountriesSlice.reducer;