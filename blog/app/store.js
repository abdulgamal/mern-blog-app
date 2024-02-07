import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/features/users/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
