import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Pages/Auth/SignUp.jsx'
import Login from './Pages/Auth/Login.jsx'
import UserDashboard from './Pages/Dashboard/UserDashboard.jsx'
import PoliceDashboard from './Pages/Dashboard/PoliceDashboard.jsx'
import ReportCrime from './Pages/Dashboard/ReportCrime.jsx'
import MyCases from './Pages/Dashboard/MyCases.jsx'
import Messages from './Pages/Dashboard/Messages.jsx'
import Resources from './Pages/Dashboard/Resources.jsx'
import Settings from './Pages/Dashboard/Settings.jsx'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard/user' element={<UserDashboard/>} />
      <Route path='/dashboard/user/report' element={<ReportCrime/>} />
      <Route path='/dashboard/user/cases' element={<MyCases/>} />
      <Route path='/dashboard/user/messages' element={<Messages/>} />
      <Route path='/dashboard/user/resources' element={<Resources/>} />
      <Route path='/dashboard/user/settings' element={<Settings/>} />
      <Route path='/dashboard/police' element={<PoliceDashboard/>} />
      <Route path='/dashboard/police/reports' element={<PoliceDashboard/>} />
      <Route path='/dashboard/police/cases' element={<PoliceDashboard/>} />
      <Route path='/dashboard/police/emergencies' element={<PoliceDashboard/>} />
      <Route path='/dashboard/police/records' element={<PoliceDashboard/>} />
      <Route path='/dashboard/police/communications' element={<PoliceDashboard/>} />
    </Routes>
  )
}

export default App
