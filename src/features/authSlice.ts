import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logOut: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
