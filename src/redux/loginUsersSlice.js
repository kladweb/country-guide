import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currUser: 0,
  userName: null,
  userPhoto: null,
  idCurrUser: null,
  isAllowShowVisited: null
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
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserPhoto: (state, action) => {
      state.userPhoto = action.payload;
    },
    setAllowShowVisited: (state, action) => {
      state.isAllowShowVisited = action.payload;
    }
  }
});

export const {
  setCurrUser,
  setUserName,
  setUserPhoto,
  setAllowShowVisited
} = loginUserSlice.actions;

export default loginUserSlice.reducer;
