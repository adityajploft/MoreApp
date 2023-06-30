// propertySlice.js

import { createSlice } from '@reduxjs/toolkit';



export const propertySlice = createSlice({
  
  name: 'property',
   initialState : {
    data: null,
    loading: true,
    // accessToken: null,
    savedData: [],

  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    saveProperty: (state, action) => {
      state.savedData.push(action.payload);
    },
  },
});

export const { setData, setLoading, setAccessToken ,saveProperty } = propertySlice.actions;
export default propertySlice.reducer;
