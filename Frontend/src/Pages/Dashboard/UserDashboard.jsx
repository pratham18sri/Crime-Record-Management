import React from 'react'

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <p>Welcome to your dashboard. From here you can view and manage your crime reports.</p>
      {/* small placeholder UI matching theme */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-md">Recent Reports (placeholder)</div>
        <div className="bg-gray-800 p-4 rounded-md">Create new report (placeholder)</div>
      </div>
    </div>
  )
}

export default UserDashboard
