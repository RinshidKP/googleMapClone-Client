import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/user';
import { Link } from 'react-router-dom';

const Header = ({ displayName }) => {
  const dispatch = useDispatch();
  const { Role } = useSelector((state) => state.User);
  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <div className="header bg-transparent w-full p-4 flex items-center justify-between">
      <div className="flex-1"></div>
      <h1 className="text-3xl font-bold text-gray-300 capitalize text-center">
        Welcome {displayName || 'User'}
      </h1>
      <div className="flex-1 flex gap-3 justify-end">
        {Role === '1313' && (
          <Link
            to='/dashboard'
            className="text-sm font-medium text-yellow-500 hover:text-yellow-700"
          >
            Dashboard
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-500 hover:text-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
