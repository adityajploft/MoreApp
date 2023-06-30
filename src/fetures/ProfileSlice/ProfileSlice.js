import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userData: null,
    updatedData: {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
    },
    isProfileUpdated: false,
    isProfileShow: false,
    isLoading: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUpdatedData: (state, action) => {
      state.updatedData = action.payload;
    },
    setIsProfileUpdated: (state, action) => {
      state.isProfileUpdated = action.payload;
    },
    setIsProfileShow: (state, action) => {
      state.isProfileShow = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    deleteUserProfile: (state) => {
      state.userData = null;
    },
  },
});

export const {
  setUserData,
  setUpdatedData,
  setIsProfileUpdated,
  setIsProfileShow,
  setLoading,
  deleteUserProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
