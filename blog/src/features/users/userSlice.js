import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logOut: (state) => {
      state.loading = false;
      state.user = null;
      state.error = "";
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError, logOut } =
  userSlice.actions;
export default userSlice.reducer;
