// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadInitialState = () => {
  const storedAuth = localStorage.getItem('auth');
  return storedAuth ? JSON.parse(storedAuth) : {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    otpSent: false,
    accountActivated: false,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access, refresh } = action.payload;
      state.user = user;
      state.token = access;
      state.refreshToken = refresh;
      state.isAuthenticated = true;

      localStorage.setItem('auth', JSON.stringify({
        user,
        token: access,
        refreshToken: refresh,
        isAuthenticated: true
      }));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth');
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