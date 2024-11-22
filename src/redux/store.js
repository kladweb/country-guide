import { configureStore } from '@reduxjs/toolkit';

import countriesReducer from './countriesSlice';
import favCountReducer from './favCountriesSlice';
import currUserReducer from './loginUsersSlice';
import isOpenInfoBarReducer from './isOpenInfoBarSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    favCountries: favCountReducer,
    currUser: currUserReducer,
    openInfoBar: isOpenInfoBarReducer
  },
});
