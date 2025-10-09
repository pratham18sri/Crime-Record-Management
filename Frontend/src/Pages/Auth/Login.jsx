import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dataContext } from '../../context/usercontex.jsx';

const Login = () => {
  const { serverUrl } = useContext(dataContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useEmail, setUseEmail] = useState(false); // Toggle between username/email
  const [loginAs, setLoginAs] = useState('user'); // 'user' or 'police'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const POLICE_ID = '2315001656';
      let payload;
      if (loginAs === 'police') {
        // Police must login with fixed ID
        payload = { username: POLICE_ID, password };
      } else {
        payload = useEmail ? { email, password } : { username, password };
      }

      const { data } = await axios.post(
        `${serverUrl}/api/login`,
        payload,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log('\u2705 Login successful:', data);
      // Redirect based on role returned from server
      const role = data?.user?.role || data?.role;
      if (role === 'police') {
        navigate('/dashboard/police');
      } else {
        navigate('/dashboard/user');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  // quick-fill police credentials for testing
  const fillPolice = () => {
    const POLICE_ID = '2315001656';
    const POLICE_PWD = 'gla-police';
    setLoginAs('police');
    setUsername(POLICE_ID);
    setEmail('');
    setPassword(POLICE_PWD);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="hidden md:flex flex-col justify-center px-6 bg-[url('/public/Annotation 2023-03-09 005352.png')] bg-cover bg-center rounded-lg shadow-lg" aria-hidden>
          <div className="bg-black/60 p-6 rounded">
            <h1 className="text-4xl font-bold text-yellow-300 mb-4">Welcome to Criminal Record Management</h1>
            <p className="text-gray-200">Securely file reports, view case status, and collaborate with law enforcement. Choose whether to login as a user or police officer.</p>
          </div>
        </div>

        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 rounded-lg">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-extrabold text-white">Log in to your account</h2>
            <p className="text-sm text-gray-400">Access your dashboard and reports</p>
          </div>

          <div className="flex gap-2 mb-4 justify-center">
            <button type="button" onClick={() => setLoginAs('user')} className={`py-2 px-4 rounded-md ${loginAs === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}>Login as User</button>
            <button type="button" onClick={() => setLoginAs('police')} className={`py-2 px-4 rounded-md ${loginAs === 'police' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}>Login as Police</button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {loginAs === 'police' ? (
              <div>
                <label htmlFor="officerId" className="block text-sm font-medium text-gray-300">Officer ID</label>
                <div className="mt-1">
                  <input
                    id="officerId"
                    name="officerId"
                    type="text"
                    value={'2315001656'}
                    readOnly
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-gray-200 sm:text-sm"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-400">Police must use their assigned officer ID and password to login.</p>
              </div>
            ) : (
              <>
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
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
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
              </>
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

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={fillPolice}
                className="flex-1 py-2 px-4 rounded-md bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600"
              >
                Police Quick-fill
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            {loginAs === 'user' ? (
              <>Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">Sign up</Link>
              </>
            ) : (
              <span className="text-yellow-300">Police must use officer credentials to login.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
