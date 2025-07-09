import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { store } from './app/store'
import Register from './features/auth/Register'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerifyOtp from './features/auth/VerifyOtp'
import Login from './features/auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Homepage from './components/Home'

function App() {

  return (
    <>
    <Provider store={store}>
      <Router>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/login" element={<Login />} />

             <Route element={<ProtectedRoute />}>
               <Route path="/" element={<Homepage />} />
            </Route>
        </Routes>
      </Router>
    </Provider>
    </>
  )
}

export default App
