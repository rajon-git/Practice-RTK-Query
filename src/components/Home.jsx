import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const Homepage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout())
      navigate('/login');
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to MyApp</h1>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hello, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8 text-center">
            {isAuthenticated ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Welcome back to your dashboard!
                </h2>
                <p className="text-gray-600 mb-6">
                  You're now logged in and can access all features.
                </p>
                <Link
                  to="/profile"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  View Profile
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Get started with our application
                </h2>
                <p className="text-gray-600 mb-6">
                  Register or login to access all features.
                </p>
                <div className="space-x-4">
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;