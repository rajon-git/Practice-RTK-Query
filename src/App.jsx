import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { store } from './app/store'
import Register from './features/auth/Register'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={store}>
      <Router>
        <Routes>
            <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
    </>
  )
}

export default App
