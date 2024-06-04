import './Background.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userAPI } from '../apiRoutes/routes';
import { useDispatch } from 'react-redux';
import { updateVerification } from '../redux/user';

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(90);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = location.state ? location.state.user : null;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await userAPI.post('/validateOtp', {
        email: user.email,
        otp,
      });
      if (response.status === 200) {
        dispatch(updateVerification({ verified: true }));
        navigate('/');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const resendOtp = async () => {
    try {
      await userAPI.post('/resendOtp', { email: user.email });
      setTimer(90);
      setCanResend(false);
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };

  return (
    <div className="homeBackground min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Enter OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-950 hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify OTP
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          {canResend ? (
            <a onClick={resendOtp} className="text-indigo-600 hover:text-indigo-500 text-sm cursor-pointer">
              Resend OTP
            </a>
          ) : (
            <p className="text-sm text-gray-500">
              Resend OTP in {timer} seconds
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Otp;
