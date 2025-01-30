import { createSlice } from '@reduxjs/toolkit';
import { sortVisitedCountries } from "../utilities/sortingCountries";

const initialState = {
  allCountriesLoadState: 0,
  allCountries: [],
}

export const allUsersCountriesSlice = createSlice({
    name: 'allUsersCountries',
    initialState,
    reducers: {
      updateAllUsersCountries: (state, action) => {
        state.allCountries = sortVisitedCountries(action.payload);
        state.allCountriesLoadState = 2;
      }
    }
  }
)

export const {updateAllUsersCountries} = allUsersCountriesSlice.actions;

export default allUsersCountriesSlice.reducer;