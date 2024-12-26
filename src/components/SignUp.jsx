// components/SignUp.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Update path to './firebase'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          const hasRedirected = localStorage.getItem('redirected');
          if (!hasRedirected) {
            localStorage.setItem('redirected', 'true');
            navigate('/login');
          }
        }
      }
    };

    const interval = setInterval(checkVerificationStatus, 3000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingMethods = await fetchSignInMethodsForEmail(auth, email);
      if (existingMethods.length > 0) {
        setError('User already exists!');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      setVerificationSent(true);
      localStorage.removeItem('redirected');
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // Access user information here if needed
      console.log('Google User Info:', user);
  
      // Directly navigate to the Home component or App
      navigate('/app'); // Replace '/home' with the actual route to your Home component
    } catch (err) {
      console.log(err);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setOtpSent(true);
      setShowForgotPassword(true);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {verificationSent ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Verify Your Email</h2>
          <p className="text-gray-600">
            A verification email has been sent to <strong>{email}</strong>. Please check your inbox and click the verification link to complete your registration. You will be redirected automatically once verified.
          </p>
        </div>
      ) : showForgotPassword ? (
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
            <p className="text-green-600 mt-4">Reset link sent successfully. Check your inbox!</p>
          )}
        </div>
      ) : (
        <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Sign Up</h2>

          {error && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  onClick={() => setError('')}
                >
                  &times;
                </button>
                <div className="flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">User Already Exists</h3>
                <p className="text-gray-600 mt-2">
                  The email address you entered is already registered.{' '}
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Log in here
                  </Link>{' '}
                  or{' '}
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-blue-500 hover:underline"
                  >
                    reset your password
                  </button>
                  .
                </p>
              </div>
            </div>
          )}

          <label className="block mb-3">
            <span className="text-gray-700">First Name</span>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>

          <label className="block mb-3">
            <span className="text-gray-700">Last Name</span>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>

          <label className="block mb-3">
            <span className="text-gray-700">Phone Number</span>
            <input
              type="tel"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>

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
            Sign Up
          </button>
          <button
  type="button"
  onClick={handleGoogleSignUp}
  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
>
  Sign Up with Google
</button>


          <p className="text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
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
  );
};

export default SignUp;
