import { configureStore } from '@reduxjs/toolkit';

import countriesReducer from './countriesSlice';
import favCountReducer from './favCountriesSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    favCountries: favCountReducer,
  },
});