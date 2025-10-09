import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Pages/Auth/SignUp.jsx'
import Login from './Pages/Auth/Login.jsx'
import UserDashboard from './Pages/Dashboard/UserDashboard.jsx'
import PoliceDashboard from './Pages/Dashboard/PoliceDashboard.jsx'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard/user' element={<UserDashboard/>} />
      <Route path='/dashboard/police' element={<PoliceDashboard/>} />
    </Routes>
  )
}

export default App
