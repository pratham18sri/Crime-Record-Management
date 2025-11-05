import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { dataContext } from '../../context/usercontex.jsx';
import { useNavigate } from 'react-router-dom';

const PoliceDashboard = () => {
  const { currentUser } = useContext(dataContext);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [reportsError, setReportsError] = useState(null);

  const { serverUrl } = useContext(dataContext);

  const fetchReports = async () => {
    try {
      setLoadingReports(true);
      setReportsError(null);
      const { data } = await axios.get(`${serverUrl}/api/crime/all`, { withCredentials: true });
      if (data.success) setReports(data.reports || []);
      else setReportsError(data.message || 'Failed to load reports');
    } catch (err) {
      console.error('Fetch reports error', err);
      setReportsError(err.message || 'Failed to load reports');
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'reports') fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Mock data for police dashboard
  const dashboardData = {
    stats: {
      totalCases: 24,
      activeCases: 12,
      pendingReports: 8,
      solvedCases: 4,
    },
    recentActivity: [
      { id: 1, type: 'new_report', caseId: 'CR-2024-001', message: 'New crime report submitted', location: 'Downtown', time: '30 minutes ago' },
      { id: 2, type: 'case_update', caseId: 'CR-2024-002', message: 'Evidence submitted for Case #CR-2024-002', time: '2 hours ago' },
      { id: 3, type: 'emergency', location: 'North District', message: 'Emergency assistance requested', time: '3 hours ago' },
      { id: 4, type: 'arrest_record', caseId: 'CR-2024-003', message: 'Arrest record updated for Case #CR-2024-003', time: '5 hours ago' }
    ],
    assignedCases: [
      { id: 'CR-2024-001', title: 'Armed Robbery', status: 'active', priority: 'high', location: 'Central Bank', lastUpdate: '2024-01-15' },
      { id: 'CR-2024-002', title: 'Vehicle Theft', status: 'investigating', priority: 'medium', location: 'Park Street', lastUpdate: '2024-01-14' },
      { id: 'CR-2024-003', title: 'Assault Case', status: 'pending', priority: 'high', location: 'Main Square', lastUpdate: '2024-01-13' }
    ]
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return <OverviewTab data={dashboardData} />;
      case 'reports':
        return <ReportsTab reports={reports} loading={loadingReports} error={reportsError} refresh={() => fetchReports()} />;
      case 'cases':
        return <div className="text-white">Active Cases</div>;
      case 'emergencies':
        return <div className="text-white">Emergency Reports</div>;
      case 'records':
        return <div className="text-white">Criminal Records</div>;
      case 'communications':
        return <div className="text-white">Department Communications</div>;
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
                <h1 className="text-2xl font-bold text-white">Law Enforcement Portal</h1>
                <p className="text-gray-400 text-sm">Police Officer Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-semibold">Officer {currentUser?.username || 'ID: 2315001656'}</p>
                <p className="text-gray-400 text-sm">Police Department</p>
              </div>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">👮</span>
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
                <button onClick={() => { navigate('/dashboard/police'); setActiveTab('overview'); }} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <span className="text-lg mr-3">📊</span>
                  <span className="font-medium">Command Center</span>
                </button>
                <button onClick={() => { navigate('/dashboard/police/reports'); setActiveTab('reports'); }} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'reports' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <span className="text-lg mr-3">📝</span>
                  <span className="font-medium">Manage Reports</span>
                </button>
                <button onClick={() => { navigate('/dashboard/police/cases'); setActiveTab('cases'); }} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'cases' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <span className="text-lg mr-3">🔍</span>
                  <span className="font-medium">Active Cases</span>
                </button>
                <button onClick={() => { navigate('/dashboard/police/emergencies'); setActiveTab('emergencies'); }} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'emergencies' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <span className="text-lg mr-3">🚨</span>
                  <span className="font-medium">Emergency Reports</span>
                </button>
                <button onClick={() => { navigate('/dashboard/police/records'); setActiveTab('records'); }} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'records' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <span className="text-lg mr-3">📁</span>
                  <span className="font-medium">Criminal Records</span>
                </button>
                <button onClick={() => { navigate('/dashboard/police/communications'); setActiveTab('communications'); }} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'communications' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <span className="text-lg mr-3">📡</span>
                  <span className="font-medium">Communications</span>
                </button>
              </nav>

              {/* Emergency Dispatch */}
              <div className="mt-8 p-4 bg-red-900/30 border border-red-700 rounded-xl">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition duration-200">
                  🚓 DISPATCH UNIT
                </button>
                <p className="text-red-200 text-xs text-center mt-2">
                  Emergency response dispatch
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
// Reports tab component
const ReportsTab = ({ reports, loading, error, refresh }) => {
  const { serverUrl } = useContext(dataContext);
  const [selected, setSelected] = useState(null);

  const assignToMe = async (reportId) => {
    try {
      await axios.put(`${serverUrl}/api/crime/${reportId}/assign`, {}, { withCredentials: true });
      refresh();
    } catch (err) {
      console.error('Assign error', err);
      alert('Failed to assign report');
    }
  };

  const changeStatus = async (reportId, status) => {
    try {
      await axios.put(`${serverUrl}/api/crime/${reportId}/status`, { status }, { withCredentials: true });
      refresh();
    } catch (err) {
      console.error('Status update error', err);
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Reports</h2>
        <button onClick={refresh} className="px-3 py-2 bg-blue-600 rounded">Refresh</button>
      </div>

      {loading && <p>Loading reports...</p>}
      {error && <div className="text-red-400">{error}</div>}

      <div className="space-y-4">
        {reports.map(r => (
          <div key={r._id} className="bg-gray-700/40 p-4 rounded-lg border border-gray-600">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-white">{r.title}</h4>
                <p className="text-sm text-gray-300">Case ID: {r._id}</p>
                <p className="text-sm text-gray-300">Reported by: {r.reportedBy?.username || 'Anonymous'}</p>
                <p className="text-sm text-gray-300">Location: {r.location?.address}, {r.location?.city}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">Status: <span className="font-semibold">{r.status}</span></p>
                <p className="text-sm text-gray-400">{new Date(r.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-3 flex items-center space-x-3">
              <button onClick={() => setSelected(r)} className="px-3 py-2 bg-gray-600 rounded">View</button>
              <button onClick={() => assignToMe(r._id)} className="px-3 py-2 bg-green-600 rounded">Assign to me</button>
              <select defaultValue={r.status} onChange={(e) => changeStatus(r._id, e.target.value)} className="px-2 py-1 bg-gray-600 rounded">
                <option value="pending">pending</option>
                <option value="investigating">investigating</option>
                <option value="resolved">resolved</option>
                <option value="closed">closed</option>
              </select>
            </div>

            {selected?._id === r._id && (
              <div className="mt-4 bg-gray-800 p-3 rounded">
                <p className="text-sm text-gray-300">{r.description}</p>
                {r.evidence?.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">Evidence:</p>
                    <ul className="text-sm text-gray-400">
                      {r.evidence.map((e, idx) => (
                        <li key={idx}><a className="underline text-blue-300" href={e.url} target="_blank" rel="noreferrer">{e.description || e.url}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-2 text-right">
                  <button onClick={() => setSelected(null)} className="px-3 py-1 bg-gray-600 rounded">Close</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const OverviewTab = ({ data }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">Command Center Overview</h2>
      <p className="text-gray-400">Police Operations Dashboard</p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 p-6 rounded-2xl border border-blue-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-sm">Total Cases</p>
            <p className="text-3xl font-bold text-white mt-2">{data.stats.totalCases}</p>
          </div>
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">📊</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 p-6 rounded-2xl border border-yellow-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-200 text-sm">Active Cases</p>
            <p className="text-3xl font-bold text-white mt-2">{data.stats.activeCases}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">🔍</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 p-6 rounded-2xl border border-red-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-200 text-sm">Pending Reports</p>
            <p className="text-3xl font-bold text-white mt-2">{data.stats.pendingReports}</p>
          </div>
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">📝</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 p-6 rounded-2xl border border-green-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-200 text-sm">Solved Cases</p>
            <p className="text-3xl font-bold text-white mt-2">{data.stats.solvedCases}</p>
          </div>
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">✅</span>
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
                <span className="text-white text-sm">
                  {activity.type === 'new_report' ? '📝' :
                   activity.type === 'case_update' ? '🔄' :
                   activity.type === 'emergency' ? '🚨' : '📋'}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">{activity.message}</p>
                {activity.location && (
                  <p className="text-blue-300 text-xs mt-1">📍 {activity.location}</p>
                )}
                <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assigned Cases */}
      <div className="bg-gray-700/50 rounded-2xl border border-gray-600 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Assigned Cases</h3>
        <div className="space-y-4">
          {data.assignedCases.map(caseItem => (
            <div key={caseItem.id} className="p-4 bg-gray-600/30 rounded-lg border border-gray-500">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">{caseItem.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  caseItem.priority === 'high' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                  caseItem.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                  'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {caseItem.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-1">Case ID: {caseItem.id}</p>
              <p className="text-gray-300 text-sm mb-1">📍 {caseItem.location}</p>
              <div className="flex justify-between items-center mt-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  caseItem.status === 'active' ? 'bg-green-500/20 text-green-300' :
                  caseItem.status === 'investigating' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {caseItem.status.toUpperCase()}
                </span>
                <p className="text-gray-400 text-xs">Updated: {caseItem.lastUpdate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PoliceDashboard;
