import React, { useState } from 'react'
import { useLoginMutation } from '../../api/authApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';

function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData,[e.target.name] : e.target.value});
    }

    const [login, { isLoading, error }] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await login(formData).unwrap();
            dispatch(setCredentials(response));
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
  return (
    <div>
      <h2>Login</h2>
      {error && <div className="error">{error.data?.detail || 'Login failed'}</div>}
      <form onSubmit={handleSubmit}>
        <div>
            <label>Email:</label>
            <input 
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
