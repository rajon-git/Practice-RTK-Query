// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  otpSent: false,
  accountActivated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access, refresh } = action.payload;
      state.user = user;
      state.token = access;
      state.refreshToken = refresh;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    setOtpSent: (state, action) => {
      state.otpSent = action.payload;
    },
    setAccountActivated: (state, action) => {
      state.accountActivated = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  setCredentials, 
  logout, 
  setOtpSent, 
  setAccountActivated,
  clearError 
} = authSlice.actions;

export default authSlice.reducer;