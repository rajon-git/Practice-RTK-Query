import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useResendOtpMutation, useVerifyOtpMutation } from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';

function VerifyOtp() {

  const location = useLocation();
  const email = location.state?.email;
  const [otp,setOtp] = useState();
  const [VerifyOtp, {isLoading, error}] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  const handleVerify = async(e) => {
    e.preventDefault();
    try {
        const response = await VerifyOtp({email,otp}).unwrap()
        dispatch(setCredentials(response));
        navigate('/')
    } catch (error) {
         console.error('OTP verification failed:', error);
    }
  }

  const handleResendOtp = async () => {
    try {
      await resendOtp(email);
      alert('OTP resent successfully');
    } catch (err) {
      console.error('Failed to resend OTP:', err);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <p>Enter the OTP sent to {email}</p>
      {error && <div className="error">{error.data?.detail || 'OTP verification failed'}</div>}
      <form onSubmit={handleVerify}>
        <div>
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      <button onClick={handleResendOtp} disabled={isResending}>
        {isResending ? 'Sending...' : 'Resend OTP'}
      </button>
    </div>
  )
}

export default VerifyOtp
