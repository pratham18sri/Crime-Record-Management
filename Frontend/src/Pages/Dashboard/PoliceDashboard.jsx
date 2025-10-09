import React from 'react'

const PoliceDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Police Dashboard</h1>
      <p>This area is restricted to police officers. You can manage reports and view assigned cases.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-md">Assigned Cases (placeholder)</div>
        <div className="bg-gray-800 p-4 rounded-md">Manage Users (placeholder)</div>
      </div>
    </div>
  )
}

export default PoliceDashboard
