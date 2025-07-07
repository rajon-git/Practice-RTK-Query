// features/auth/Register.jsx
import React, { useState } from 'react';
import { useRegisterMutation } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { setOtpSent } from './authSlice';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      alert("Passwords don't match");
      return;
    }
    
    try {
      const response = await register({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      
      dispatch(setOtpSent(true));
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <div className="error">{error.data?.detail || 'Registration failed'}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;