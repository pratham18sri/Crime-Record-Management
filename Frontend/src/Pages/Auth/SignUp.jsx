import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { dataContext } from '../../context/usercontex.jsx'

const SignUp = () => {
  const { serverUrl } = useContext(dataContext)
  const navigate = useNavigate();
  
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')   
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handlesubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (!firstname || !lastname || !username || !email || !password) {
        alert("Please fill all required fields")
        setIsLoading(false)
        return
      }

      const POLICE_ID = '2315001656';
      if (
        username === POLICE_ID ||
        email === POLICE_ID ||
        username.toLowerCase() === 'police' ||
        email.toLowerCase() === 'police'
      ) {
        alert('You cannot register with the police ID or as "police". Police must use the login with provided credentials.');
        setIsLoading(false)
        return;
      }

      const userData = {
        firstname,
        lastname,
        username,
        email,
        password
      }

      const { data } = await axios.post(`${serverUrl}/api/signup`, userData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log("Server response:", data)
      alert("\u2705 Signup successful!")
      navigate('/dashboard/user');
    } catch(error) {
      console.error("Error during signup:", error)
      alert(error.response?.data?.message || "Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
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
            ⚠️ RESTRICTED ACCESS - OFFICIAL USE ONLY ⚠️
          </div>
          
          <div className="bg-black/40 p-8 rounded-xl border border-gray-600 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white">CRIME MANAGEMENT SYSTEM</h1>
            </div>
            
            <h2 className="text-4xl font-bold text-yellow-300 mb-4 leading-tight">
              Secure Citizen Portal
            </h2>
            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
              Register to securely report incidents, track case progress, and collaborate with law enforcement agencies. Your safety is our priority.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-200">
                <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Encrypted data transmission</span>
              </div>
              <div className="flex items-center text-gray-200">
                <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>24/7 Incident reporting</span>
              </div>
              <div className="flex items-center text-gray-200">
                <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Real-time case updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="bg-gray-800/90 py-8 px-6 shadow-2xl rounded-2xl border border-gray-700 backdrop-blur-sm">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Register to access crime reporting system</p>
          </div>

          <form className="space-y-6" onSubmit={handlesubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="firstname" className="block text-sm font-semibold text-gray-300">
                  First Name *
                </label>
                <div className="relative">
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    autoComplete="given-name"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition duration-200"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lastname" className="block text-sm font-semibold text-gray-300">
                  Last Name *
                </label>
                <div className="relative">
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    autoComplete="family-name"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition duration-200"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-300">
                Username *
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition duration-200"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300">
                Email Address *
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300">
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition duration-200"
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
              <input
                id="terms-and-privacy"
                name="terms-and-privacy"
                type="checkbox"
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700 mt-1"
                required
              />
              <label htmlFor="terms-and-privacy" className="text-sm text-gray-300">
                I agree to the <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold underline">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold underline">Privacy Policy</a>. I understand that false reporting may lead to legal consequences.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ${
                isLoading 
                  ? 'bg-blue-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-semibold text-blue-400 hover:text-blue-300 underline transition duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg">
            <p className="text-xs text-yellow-200 text-center">
              🔒 This is a secure government system. All activities are monitored and recorded.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp