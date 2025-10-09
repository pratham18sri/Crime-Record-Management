import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { dataContext } from '../context/usercontex.jsx';

const Login = () => {
  const { serverUrl } = useContext(dataContext);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useEmail, setUseEmail] = useState(false); // Toggle between username/email

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = useEmail 
        ? { email, password }
        : { username, password };

      const { data } = await axios.post(
        `${serverUrl}/api/login`,
        payload,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log('✅ Login successful:', data);
      alert(" ✅ Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Toggle between username/email */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setUseEmail(false)}
                className={`flex-1 py-2 rounded-md ${!useEmail ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Username
              </button>
              <button
                type="button"
                onClick={() => setUseEmail(true)}
                className={`flex-1 py-2 rounded-md ${useEmail ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Email
              </button>
            </div>

            {!useEmail ? (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white sm:text-sm"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;