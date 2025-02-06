import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ICountries } from "../types/globalTypes";

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

// interface IState1 {
//   state: number;
//   error: string | null;
// }
//
// export type IUpdateLoadState = (state: IState1, payload: any) => void;
// export type IUpdateData = (data: ICountries[]) => void;
// export type IUpdateCurrentData = (state: IStateCountries) => void;

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
      // state.countPages = (Array.isArray(action.payload)) ? Math.ceil(action.payload.length / 10) : 0;
      state.countPages = Math.ceil(action.payload.length / 10);
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
