import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ICountries } from "../types/globalTypes";
import { IAllUserCountries } from "./allUsersCountriesSlice";

export interface IStateCountries {
  dataLoadState: 0 | 1 | 2 | 3;
  dataLoadError: string | null;
  page: string | null;
  data: ICountries[] | null;
  currentData: ICountries[] | null;
  countPages: number;
}

const initialState: IStateCountries = {
  dataLoadState: 0, // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
  dataLoadError: null,
  page: null,
  data: null,
  currentData: null,
  countPages: 0,
};

export interface IStateLoadState {
  state: 0 | 1 | 2 | 3;
  error: string | null;
}

export interface IStateCurrentData {
  data: ICountries[];
  page?: string | null;
}

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    updateLoadState: (state, action: PayloadAction<IStateLoadState>) => {
      state.dataLoadState = action.payload.state;
      state.dataLoadError = action.payload.error;
    },
    updateData: (state, action: PayloadAction<ICountries[]>) => {
      state.data = action.payload;
      // state.countPages = (Array.isArray(action.payload)) ? Math.ceil(action.payload.length / 10) : 0;
      state.countPages = Math.ceil(action.payload.length / 10);
    },
    updateCurrentData: (state, action: PayloadAction<IStateCurrentData>) => {
      if (action.payload.page === 'all') {
        state.currentData = action.payload.data;
      } else {
        if (action.payload.page !== 'visited') {
          const numberPage: number = Number(action.payload.page);
          state.currentData = action.payload.data.slice((numberPage - 1) * 10, numberPage * 10);
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
