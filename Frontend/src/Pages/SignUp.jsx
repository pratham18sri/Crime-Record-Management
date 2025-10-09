import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { dataContext } from '../context/usercontex.jsx'

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
      // Validate required fields
      if (!firstname || !lastname || !username || !email || !password) {
        alert("Please fill all required fields")
        return
      }

      const userData = {
        firstname,
        lastname,
        username,
        email,
        password
      }

      console.log("Submitting:", userData)

      const { data } = await axios.post(`${serverUrl}/api/signup`, userData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log("Server response:", data)
      alert("✅ Signup successful!")
    } catch(error) {
      console.error("Error during signup:", error)
      alert(error.response?.data?.message || "Signup failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Join our community today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
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