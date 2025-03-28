import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
const username = localStorage.getItem("user");

const initialState = {
  user: token ? jwtDecode(token) : null,
  username: username ? username : null,
  token: token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.user.name;
      state.user = jwtDecode(action.payload.token);
      localStorage.setItem("user", action.payload.user.name);
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
