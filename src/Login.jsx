import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Navbar from './Navbar'; // Importing Navbar component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      navigate('/app'); // Redirect to the App.jsx route after login
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setOtpSent(true);
      setShowForgotPassword(false);
    } catch (err) {
      console.error(err);
      setError('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    
      <div className="flex flex-1 items-center justify-center">
        {showForgotPassword ? (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Forgot Password</h2>
            <p className="text-gray-600 mb-4">
              Enter your email address to receive a password reset link.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleForgotPassword}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              Send Reset Link
            </button>
            {otpSent && (
              <p className="text-green-600 mt-4">
                Reset link sent successfully. Check your inbox!
              </p>
            )}
          </div>
        ) : (
          <form
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            onSubmit={handleLogin}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Login</h2>

            {error && (
              <div
                className="bg-red-100 text-red-600 p-3 rounded mb-4"
                role="alert"
              >
                {error}
              </div>
            )}

            <label className="block mb-3">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="block mb-3">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 mb-3"
            >
              Login
            </button>

            <p className="text-center mt-4 text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>

            <p className="text-center mt-4 text-gray-600">
              Forgot your password?{' '}
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-blue-500 hover:underline"
              >
                Reset here
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
