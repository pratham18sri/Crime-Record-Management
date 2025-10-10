import React, { useState, useContext } from 'react';
import { dataContext } from '../../context/usercontex.jsx';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { currentUser } = useContext(dataContext);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Mock data for dashboard
  const dashboardData = {
    stats: {
      totalReports: 8,
      pendingCases: 3,
      resolvedCases: 4,
      underInvestigation: 1
    },
    recentActivity: [
      { id: 1, type: 'case_update', caseId: 'CR-2024-001', message: 'Case status updated to Under Investigation', time: '2 hours ago' },
      { id: 2, type: 'new_message', officer: 'Officer Smith', message: 'Sent you a message regarding your case', time: '5 hours ago' },
      { id: 3, type: 'evidence_request', caseId: 'CR-2024-003', message: 'Additional evidence requested', time: '1 day ago' }
    ],
    activeCases: [
      { id: 'CR-2024-001', title: 'Vehicle Theft', status: 'investigating', officer: 'Officer Smith', lastUpdate: '2024-01-15' },
      { id: 'CR-2024-002', title: 'Burglary Report', status: 'pending', officer: 'Officer Johnson', lastUpdate: '2024-01-14' },
      { id: 'CR-2024-003', title: 'Fraud Case', status: 'evidence_required', officer: 'Officer Brown', lastUpdate: '2024-01-13' }
    ]
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return <OverviewTab data={dashboardData} />;
      case 'reports':
        return <ReportCrimeLink />;
      case 'cases':
        return <MyCasesLink />;
      case 'messages':
        return <MessagesLink />;
      case 'resources':
        return <ResourcesLink />;
      case 'settings':
        return <SettingsLink />;
      default:
        return <OverviewTab data={dashboardData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Crime Management System</h1>
                <p className="text-gray-400 text-sm">Citizen Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-semibold">Welcome, {currentUser?.username || currentUser?.firstname || 'User'}</p>
                <p className="text-gray-400 text-sm">Citizen Account</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">{(currentUser?.username || currentUser?.firstname || 'U').charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6">
              <nav className="space-y-2">
                <button onClick={() => { navigate('/dashboard/user'); setActiveTab('overview'); }} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <span className="text-lg mr-3">📊</span>
                  <span className="font-medium">Dashboard Overview</span>
                </button>
                <button onClick={() => { navigate('/dashboard/user/report'); setActiveTab('reports'); }} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'reports' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <span className="text-lg mr-3">📝</span>
                  <span className="font-medium">File Report</span>
                </button>
                <button onClick={() => { navigate('/dashboard/user/cases'); setActiveTab('cases'); }} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'cases' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <span className="text-lg mr-3">📋</span>
                  <span className="font-medium">My Cases</span>
                </button>
                <button onClick={() => { navigate('/dashboard/user/messages'); setActiveTab('messages'); }} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'messages' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <span className="text-lg mr-3">💬</span>
                  <span className="font-medium">Messages</span>
                </button>
                <button onClick={() => { navigate('/dashboard/user/resources'); setActiveTab('resources'); }} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'resources' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <span className="text-lg mr-3">📚</span>
                  <span className="font-medium">Resources</span>
                </button>
                <button onClick={() => { navigate('/dashboard/user/settings'); setActiveTab('settings'); }} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <span className="text-lg mr-3">⚙️</span>
                  <span className="font-medium">Settings</span>
                </button>
              </nav>

              {/* Emergency Button */}
              <div className="mt-8 p-4 bg-red-900/30 border border-red-700 rounded-xl">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition duration-200">
                  🚨 EMERGENCY HELP
                </button>
                <p className="text-red-200 text-xs text-center mt-2">
                  Immediate police assistance
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ data }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
      <p className="text-gray-400">Welcome back to your security portal</p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 p-6 rounded-2xl border border-blue-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-sm">Total Reports</p>
            <p className="text-3xl font-bold text-white mt-2">{data.stats.totalReports}</p>
          </div>
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">📝</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 p-6 rounded-2xl border border-yellow-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-200 text-sm">Pending Cases</p>
            <p className="text-3xl font-bold text-white mt-2">{data.stats.pendingCases}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">⏳</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 p-6 rounded-2xl border border-green-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-200 text-sm">Resolved Cases</p>
            <p className="text-3xl font-bold text-white mt-2">{data.stats.resolvedCases}</p>
          </div>
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">✅</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 p-6 rounded-2xl border border-red-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-200 text-sm">Investigating</p>
            <p className="text-3xl font-bold text-white mt-2">{data.stats.underInvestigation}</p>
          </div>
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">🔍</span>
          </div>
        </div>
      </div>
    </div>

    {/* Recent Activity and Active Cases */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Activity */}
      <div className="bg-gray-700/50 rounded-2xl border border-gray-600 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {data.recentActivity.map(activity => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-600/30 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">🔔</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">{activity.message}</p>
                <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Cases */}
      <div className="bg-gray-700/50 rounded-2xl border border-gray-600 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Active Cases</h3>
        <div className="space-y-4">
          {data.activeCases.map(caseItem => (
            <div key={caseItem.id} className="p-4 bg-gray-600/30 rounded-lg border border-gray-500">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">{caseItem.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  caseItem.status === 'investigating' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                  caseItem.status === 'pending' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                  'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {caseItem.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-2">Case ID: {caseItem.id}</p>
              <p className="text-gray-300 text-sm">Assigned Officer: {caseItem.officer}</p>
              <p className="text-gray-400 text-xs mt-2">Last update: {caseItem.lastUpdate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default UserDashboard;