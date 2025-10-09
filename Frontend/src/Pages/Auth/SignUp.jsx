import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { dataContext } from '../../context/usercontex.jsx'

const SignUp = () => {
  const { serverUrl } = useContext(dataContext)
  
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')   
  const [password, setPassword] = useState('')

  async function handlesubmit(e) {
    e.preventDefault()
    try {
      if (!firstname || !lastname || !username || !email || !password) {
        alert("Please fill all required fields")
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
    } catch(error) {
      console.error("Error during signup:", error)
      alert(error.response?.data?.message || "Signup failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="hidden md:flex flex-col justify-center px-6 bg-[url('/public/Annotation 2023-03-09 005352.png')] bg-cover bg-center rounded-lg shadow-lg" aria-hidden>
          <div className="bg-black/60 p-6 rounded">
            <h1 className="text-4xl font-bold text-yellow-300 mb-4">Welcome to Criminal Record Management</h1>
            <p className="text-gray-200">Create your account to file reports, track cases, and interact with law enforcement securely.</p>
          </div>
        </div>

        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 rounded-lg">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-extrabold text-white">Create your account</h2>
            <p className="text-sm text-gray-400">Register to start reporting.</p>
          </div>

          <form className="space-y-6" onSubmit={handlesubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-300">
                  First name
                </label>
                <div className="mt-1">
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    autoComplete="given-name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-300">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    autoComplete="family-name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white sm:text-sm"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms-and-privacy"
                name="terms-and-privacy"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
                required
              />
              <label htmlFor="terms-and-privacy" className="ml-2 block text-sm text-gray-300">
                I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms</a> and <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
