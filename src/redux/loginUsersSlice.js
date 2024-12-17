import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currUser: 0,
  idCurrUser: null,
  isAllowShowVisited: true
}

export const loginUserSlice = createSlice({
  name: 'currUser',
  initialState,
  reducers: {
    setCurrUser: (state, action) => {
      state.currUser = action.payload.currUser;
      if (action.payload.currUser) {
        state.idCurrUser = action.payload.currUser.uid;
      }
    },
    setAllowShowVisited: (state, action) => {
      console.log("redux: ", action.payload);
      state.isAllowShowVisited = action.payload;
    }
  }
});

export const {
  setCurrUser,
  setAllowShowVisited
} = loginUserSlice.actions;

export default loginUserSlice.reducer;
