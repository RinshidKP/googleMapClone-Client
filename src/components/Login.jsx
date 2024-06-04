import './Background.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../apiRoutes/routes';
import { userLogin } from '../redux/user';
import validator from 'validator';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!validator.isEmail(email)) {
      errors.email = 'Invalid email address';
    }
    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await userAPI.post('/login', { email, password });
      const user = response.data.user;

      dispatch(
        userLogin({
          verified: user.verified,
          email: user.email,
          id: user._id,
          token: response.data.refreshToken,
          access: response.data.accessToken,
          role: user.role,
        })
      );

      navigate('/', { state: { user: response.data.user } });
    } catch (error) {
      console.error('Error during login:', error);
      setErrors({ api: 'Invalid email or password' });
    }
  };

  return (
    <div className="background min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={` block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm ">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm ">{errors.password}</p>}
          </div>
          {errors.api && <p className="text-red-500 text-sm mt-1">{errors.api}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-950 hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="mt-2 text-center">
          <a href="#" className="text-indigo-600 hover:text-indigo-500 text-sm">
            Forgot your password?
          </a>
        </div>
        <div className="mt-1 text-center">
          <a href="signup" className="text-indigo-600 hover:text-indigo-500 text-sm">
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
