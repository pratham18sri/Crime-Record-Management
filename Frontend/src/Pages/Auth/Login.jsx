import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dataContext } from '../../context/usercontex.jsx';

const Login = () => {
  const { serverUrl, refreshUser } = useContext(dataContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useEmail, setUseEmail] = useState(false);
  const [loginAs, setLoginAs] = useState('user');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const POLICE_ID = '2315001656';
      let payload;
      if (loginAs === 'police') {
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
      await refreshUser();
      const role = data?.user?.role || data?.role;
      if (role === 'police') {
        navigate('/dashboard/police');
      } else {
        navigate('/dashboard/user');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillPolice = () => {
    const POLICE_ID = '2315001656';
    const POLICE_PWD = 'gla-police';
    setLoginAs('police');
    setUsername(POLICE_ID);
    setEmail('');
    setPassword(POLICE_PWD);
  }

  const fillDemoUser = () => {
    setLoginAs('user');
    setUseEmail(false);
    setUsername('demo_user');
    setEmail('');
    setPassword('demo123');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex flex-col justify-center px-8 bg-gradient-to-br from-blue-900/80 to-red-900/80 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm relative overflow-hidden">
          {/* Police Tape Effect */}
          <div className="absolute top-0 left-0 right-0 bg-yellow-400 text-black text-center py-2 font-bold text-sm transform -rotate-2 shadow-md border-b-2 border-black">
            🔒 SECURE LAW ENFORCEMENT PORTAL - AUTHORIZED PERSONNEL ONLY 🔒
          </div>
          
          <div className="bg-black/40 p-8 rounded-xl border border-gray-600 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 border-2 border-white">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white">CRIME MANAGEMENT SYSTEM</h1>
            </div>
            
            <h2 className="text-4xl font-bold text-yellow-300 mb-4 leading-tight">
              Secure Access Portal
            </h2>
            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
              Access your account to manage cases, file reports, and collaborate with law enforcement. Choose your role to continue.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-blue-900/30 rounded-lg border border-blue-700">
                <svg className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-white">Citizen Login</h3>
                  <p className="text-gray-300 text-sm">File reports, track cases, and communicate with officers</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-red-900/30 rounded-lg border border-red-700">
                <svg className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <div>
                  <h3 className="font-semibold text-white">Police Officer Login</h3>
                  <p className="text-gray-300 text-sm">Access law enforcement tools and case management systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-gray-800/90 py-8 px-6 shadow-2xl rounded-2xl border border-gray-700 backdrop-blur-sm">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Secure Login</h2>
            <p className="text-gray-400">Access your crime management account</p>
          </div>

          {/* Role Selection */}
          <div className="flex gap-3 mb-6 p-1 bg-gray-700 rounded-lg">
            <button
              type="button"
              onClick={() => setLoginAs('user')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
                loginAs === 'user' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              👤 Citizen
            </button>
            <button
              type="button"
              onClick={() => setLoginAs('police')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
                loginAs === 'police' 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              🚔 Police Officer
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {loginAs === 'police' ? (
              <div className="space-y-2">
                <label htmlFor="officerId" className="block text-sm font-semibold text-gray-300">
                  Officer ID
                </label>
                <div className="relative">
                  <input
                    id="officerId"
                    name="officerId"
                    type="text"
                    value={'2315001656'}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-700 border border-red-600 rounded-lg shadow-sm text-white font-mono text-center font-bold cursor-not-allowed"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-red-300 bg-red-900/30 p-2 rounded border border-red-800">
                  Police officers must use assigned credentials. Unauthorized access is prohibited.
                </p>
              </div>
            ) : (
              <>
                {/* Login Method Toggle */}
                <div className="flex gap-2 p-1 bg-gray-700 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setUseEmail(false)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                      !useEmail 
                        ? 'bg-blue-600 text-white shadow' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Username
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseEmail(true)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                      useEmail 
                        ? 'bg-blue-600 text-white shadow' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Email
                  </button>
                </div>

                {!useEmail ? (
                  <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-300">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition duration-200"
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition duration-200"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Quick Fill Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ${
                  isLoading 
                    ? 'bg-blue-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  '🔐 Login'
                )}
              </button>
              
              {loginAs === 'police' ? (
                <button
                  type="button"
                  onClick={fillPolice}
                  className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-sm border border-red-500 transition duration-200"
                >
                  🚔 Quick Fill
                </button>
              ) : (
                <button
                  type="button"
                  onClick={fillDemoUser}
                  className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold shadow-sm border border-gray-500 transition duration-200"
                >
                  👤 Demo User
                </button>
              )}
            </div>
          </form>

          <div className="mt-8 text-center">
            {loginAs === 'user' ? (
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="font-semibold text-blue-400 hover:text-blue-300 underline transition duration-200"
                >
                  Register here
                </Link>
              </p>
            ) : (
              <p className="text-yellow-300 bg-yellow-900/30 p-3 rounded-lg border border-yellow-700 text-sm">
                ⚠️ Police officers must use department-issued credentials. Contact IT support for access issues.
              </p>
            )}
          </div>

          {/* Security Footer */}
          <div className="mt-6 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure encrypted connection • Activity monitored and logged</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;