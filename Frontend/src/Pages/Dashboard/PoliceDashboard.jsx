import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// IMPORTING YOUR REAL CONTEXT
import { dataContext } from '../../context/usercontex.jsx';

const PoliceDashboard = () => {
  // Now using the real context from your app
  const { currentUser, logout, serverUrl } = useContext(dataContext);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [reportsError, setReportsError] = useState(null);

  const fetchReports = async () => {
    try {
      setLoadingReports(true);
      setReportsError(null);
      if (!currentUser || currentUser.role !== 'police') {
        setReportsError('You must be logged in as a police officer to view all reports.');
        return;
      }

      const { data } = await axios.get(`${serverUrl}/api/crime/all`, { withCredentials: true });
      if (data.success) setReports(data.reports || []);
      else setReportsError(data.message || 'Failed to load reports');
    } catch (err) {
      console.error('Fetch reports error', err);
      // If unauthorized, guide the user to log in as police
      if (err?.response?.status === 401) {
        setReportsError('Unauthorized. Please login as a police officer to view all reports.');
        return;
      }
      setReportsError(err.message || 'Failed to load reports');
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'reports') fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Mock data for the UI tabs
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
      { id: 'CR-2024-001', title: 'Armed Robbery', status: 'active', priority: 'high', location: 'Central Bank', lastUpdate: '2024-01-15', progress: 45, officer: 'Sgt. Miller' },
      { id: 'CR-2024-002', title: 'Vehicle Theft', status: 'investigating', priority: 'medium', location: 'Park Street', lastUpdate: '2024-01-14', progress: 70, officer: 'Ofc. Chen' },
      { id: 'CR-2024-003', title: 'Assault Case', status: 'pending', priority: 'high', location: 'Main Square', lastUpdate: '2024-01-13', progress: 15, officer: 'Det. Johnson' }
    ],
    emergencies: [
      { id: 'EM-991', type: 'Burglary in Progress', location: '124 Maple Ave', time: 'NOW', status: 'Dispatching', units: 'Unit 4, Unit 7' },
      { id: 'EM-992', type: 'Traffic Collision', location: 'Highway 45 Exit', time: '5m ago', status: 'On Scene', units: 'Unit 12' },
      { id: 'EM-993', type: 'Disturbance', location: 'Oak Park', time: '12m ago', status: 'Resolved', units: 'Unit 3' },
    ],
    criminals: [
      { id: 'P-4401', name: 'John Doe', offense: 'Grand Theft', status: 'Wanted', risk: 'High', lastSeen: 'North District' },
      { id: 'P-4402', name: 'Jane Smith', offense: 'Fraud', status: 'In Custody', risk: 'Low', lastSeen: 'Central Station' },
      { id: 'P-4403', name: 'Mike Ross', offense: 'Assault', status: 'Parole', risk: 'Medium', lastSeen: 'West End' },
    ],
    bulletins: [
      { id: 1, title: 'Shift Briefing 0600', content: 'Be on lookout for a silver sedan related to case CR-2024-001.', priority: 'High', date: 'Today' },
      { id: 2, title: 'System Maintenance', content: 'Database will be down for maintenance at 0300 hours.', priority: 'Low', date: 'Yesterday' },
    ]
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return <OverviewTab data={dashboardData} />;
      case 'reports':
        return <ReportsTab reports={reports} loading={loadingReports} error={reportsError} refresh={() => fetchReports()} />;
      case 'cases':
        return <ActiveCasesTab cases={dashboardData.assignedCases} />;
      case 'emergencies':
        return <EmergenciesTab emergencies={dashboardData.emergencies} />;
      case 'records':
        return <CriminalRecordsTab records={dashboardData.criminals} />;
      case 'communications':
        return <CommunicationsTab bulletins={dashboardData.bulletins} />;
      default:
        return <OverviewTab data={dashboardData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-sans">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Law Enforcement Portal</h1>
                <p className="text-gray-400 text-sm">Police Officer Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right hidden md:block">
                <p className="text-white font-semibold">Ofc. {currentUser?.username || 'Officer'}</p>
                <p className="text-gray-400 text-sm">Police Department</p>
              </div>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">👮</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation - RESTORED TO ORIGINAL DESIGN */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 sticky top-24">
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
            <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 min-h-[600px]">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const StatusBadge = ({ status }) => {
  const styles = {
    active: 'bg-red-500/20 text-red-300 border-red-500/30',
    investigating: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    resolved: 'bg-green-500/20 text-green-300 border-green-500/30',
    closed: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    rejected: 'bg-red-900/20 text-red-400 border-red-900/30'
  };
  return (
<<<<<<< HEAD
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
              <div className="flex-1">
                <h4 className="font-semibold text-white text-lg">{r.title}</h4>
                <p className="text-xs text-gray-400 mt-1">Case ID: {r._id}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-300">📋 <span className="font-medium">Reported by:</span> {r.reportedBy ? `${r.reportedBy.firstname} ${r.reportedBy.lastname}` : 'Anonymous'}</p>
                  {r.reportedBy?.email && <p className="text-xs text-gray-400">📧 {r.reportedBy.email}</p>}
                  <p className="text-sm text-gray-300">📍 <span className="font-medium">Location:</span> {r.location?.address}, {r.location?.city}</p>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm text-gray-300">Status: <span className={`font-semibold px-2 py-1 rounded text-xs ${
                  r.status === 'active' ? 'bg-green-500/20 text-green-300' :
                  r.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                  r.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                  r.status === 'investigating' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>{r.status.toUpperCase()}</span></p>
                <p className="text-xs text-gray-400 mt-2">{new Date(r.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-3 flex items-center space-x-3">
              <button onClick={() => setSelected(r)} className="px-3 py-2 bg-gray-600 rounded">View</button>
              <button onClick={() => assignToMe(r._id)} className="px-3 py-2 bg-green-600 rounded">Assign to me</button>
              <button onClick={() => changeStatus(r._id, 'active')} className="px-3 py-2 bg-blue-600 rounded">Accept (Active)</button>
              <button onClick={() => changeStatus(r._id, 'rejected')} className="px-3 py-2 bg-red-600 rounded">Reject</button>
              <select defaultValue={r.status} onChange={(e) => changeStatus(r._id, e.target.value)} className="px-2 py-1 bg-gray-600 rounded">
                <option value="pending">pending</option>
                <option value="active">active</option>
                <option value="accepted">accepted</option>
                <option value="rejected">rejected</option>
                <option value="investigating">investigating</option>
                <option value="resolved">resolved</option>
                <option value="closed">closed</option>
              </select>
            </div>

            {selected?._id === r._id && (
              <div className="mt-4 bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Description</p>
                    <p className="text-sm text-gray-300 mt-1">{r.description}</p>
                  </div>
                  {r.incidentDate && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Incident Date</p>
                      <p className="text-sm text-gray-300 mt-1">{new Date(r.incidentDate).toLocaleString()}</p>
                    </div>
                  )}
                  {r.witnesses?.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Witnesses</p>
                      <ul className="text-sm text-gray-300 mt-1 space-y-1 ml-2">
                        {r.witnesses.map((w, idx) => (
                          <li key={idx}>👤 {w.name} {w.contact ? `(${w.contact})` : ''}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {r.evidence?.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Evidence</p>
                      <ul className="text-sm text-gray-400 mt-1 space-y-1">
                        {r.evidence.map((e, idx) => (
                          <li key={idx}>📎 <a className="underline text-blue-300 hover:text-blue-200" href={e.url} target="_blank" rel="noreferrer">{e.description || e.url}</a></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {r.reportedBy && (
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Reporter Details</p>
                      <div className="text-sm text-gray-300 mt-1 space-y-1">
                        <p>👤 <span className="font-medium">{r.reportedBy.firstname} {r.reportedBy.lastname}</span></p>
                        {r.reportedBy.email && <p>📧 {r.reportedBy.email}</p>}
                        {r.reportedBy.username && <p>🔑 @{r.reportedBy.username}</p>}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-right">
                  <button onClick={() => setSelected(null)} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm font-medium">Close</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
=======
    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${styles[status] || styles.pending} uppercase tracking-wide`}>
      {status}
    </span>
>>>>>>> adfe0a9218f8f7ac739082bc3320a44125b2bdce
  );
};

// --- TABS ---

const ActiveCasesTab = ({ cases }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="flex justify-between items-center border-b border-gray-700 pb-4">
      <div>
        <h2 className="text-2xl font-bold text-white">Active Investigations</h2>
        <p className="text-gray-400 text-sm">Ongoing priority cases</p>
      </div>
      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium shadow-lg shadow-blue-900/20 transition-transform active:scale-95">
        + New Case File
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases.map(caseItem => (
        <div key={caseItem.id} className="bg-gray-700/20 border border-gray-600 rounded-xl p-5 hover:bg-gray-700/30 transition-all group relative overflow-hidden shadow-lg">
          <div className={`absolute top-0 left-0 w-1 h-full ${
            caseItem.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'
          }`}></div>
          
          <div className="flex justify-between items-start mb-3 pl-2">
            <div>
              <span className="text-xs font-mono text-gray-500">{caseItem.id}</span>
              <h3 className="text-lg font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">{caseItem.title}</h3>
            </div>
            <StatusBadge status={caseItem.status} />
          </div>

          <div className="pl-2 space-y-3">
            <div className="flex items-center text-sm text-gray-300">
              <span className="w-5 text-center mr-2">📍</span>
              {caseItem.location}
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <span className="w-5 text-center mr-2">👮</span>
              {caseItem.officer}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-600/50">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Investigation Status</span>
                <span>{caseItem.progress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    caseItem.progress > 80 ? 'bg-green-500' : 'bg-blue-500'
                  }`} 
                  style={{ width: `${caseItem.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium hover:underline">View Case Details →</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EmergenciesTab = ({ emergencies }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="flex justify-between items-center border-b border-gray-700 pb-4">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className="relative flex h-3 w-3 mr-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          Live Emergency Feed
        </h2>
        <p className="text-gray-400 text-sm mt-1">Real-time 911 dispatch queue</p>
      </div>
      <div className="flex gap-2">
         <span className="px-3 py-1 bg-red-900/30 border border-red-800 text-red-400 rounded-full text-xs font-bold uppercase tracking-wider">
            High Priority
         </span>
      </div>
    </div>

    <div className="space-y-4">
      {emergencies.map(em => (
        <div key={em.id} className="bg-gray-800 border-l-4 border-red-500 rounded-r-xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 transition-transform hover:scale-[1.01]">
           <div className="flex-1">
             <div className="flex items-center gap-3 mb-1">
               <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded shadow-sm">911</span>
               <h3 className="text-xl font-bold text-white">{em.type}</h3>
               <span className="text-red-400 font-mono text-sm border border-red-900/50 px-2 rounded bg-red-900/10">{em.time}</span>
             </div>
             <p className="text-gray-300 text-lg flex items-center mt-2 font-medium">
               <span className="mr-2">📍</span> {em.location}
             </p>
             <p className="text-gray-500 text-sm mt-1">Status: <span className="text-gray-300">{em.status}</span> • Units: <span className="text-blue-400">{em.units}</span></p>
           </div>
           
           <div className="flex gap-3 w-full md:w-auto">
             <button className="flex-1 md:flex-none px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition border border-gray-600">
               Locate
             </button>
             <button className="flex-1 md:flex-none px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-lg shadow-red-900/30 transition flex items-center justify-center">
               DISPATCH
             </button>
           </div>
        </div>
      ))}
    </div>
  </div>
);

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
    <div className="space-y-6 animate-fadeIn text-white">
      <div className="flex justify-between items-center border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold">Incoming Reports</h2>
        <button onClick={refresh} className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-sm">
          <span className="mr-2">🔄</span> Refresh
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && <div className="p-4 bg-red-900/20 border border-red-800 text-red-300 rounded-lg">{error}</div>}

      {!loading && reports.length === 0 && (
        <div className="text-center py-10 text-gray-500">No reports found.</div>
      )}

      <div className="grid gap-4">
        {reports.map(r => (
          <div key={r._id} className="bg-gray-700/20 hover:bg-gray-700/40 p-5 rounded-xl border border-gray-600 transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-semibold text-white">{r.title}</h4>
                  <StatusBadge status={r.status} />
                </div>
                <p className="text-xs text-gray-400 font-mono mb-2">ID: {r._id}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  <span className="flex items-center">👤 {r.reportedBy?.username || 'Anonymous'}</span>
                  <span className="flex items-center">📍 {r.location?.address}, {r.location?.city}</span>
                  <span className="flex items-center">🕒 {new Date(r.createdAt).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <button onClick={() => setSelected(r)} className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm flex-1 md:flex-none text-center">View Details</button>
                <button onClick={() => assignToMe(r._id)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm flex-1 md:flex-none text-center">Assign</button>
                <div className="relative group">
                  <select 
                    defaultValue={r.status} 
                    onChange={(e) => changeStatus(r._id, e.target.value)} 
                    className="appearance-none px-3 py-1.5 bg-gray-800 border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer w-full md:w-auto"
                  >
                    <option value="pending">Pending</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>

            {selected?._id === r._id && (
              <div className="mt-4 pt-4 border-t border-gray-600/50 animate-fadeIn">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-gray-300 leading-relaxed mb-4">{r.description}</p>
                  {r.evidence?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">Evidence</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {r.evidence.map((e, idx) => (
                          <a key={idx} href={e.url} target="_blank" rel="noreferrer" className="flex items-center p-2 bg-gray-700/50 rounded border border-gray-600 hover:bg-gray-700 transition">
                            <span className="mr-2">📎</span>
                            <span className="text-blue-300 text-sm truncate">{e.description || 'View Attachment'}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end">
                    <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white text-sm underline">Hide Details</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CriminalRecordsTab = ({ records }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-700 pb-4">
      <h2 className="text-2xl font-bold text-white">Criminal Database</h2>
      <div className="relative w-full md:w-96">
        <input 
          type="text" 
          placeholder="Search Name, ID, or Offense..." 
          className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
      </div>
    </div>

    <div className="overflow-x-auto bg-gray-800 rounded-xl border border-gray-700">
      <table className="w-full text-left text-gray-300">
        <thead className="bg-gray-700/50 text-xs uppercase font-semibold text-gray-400">
          <tr>
            <th className="px-6 py-4">Subject</th>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Offense</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Risk Level</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {records.map(rec => (
            <tr key={rec.id} className="hover:bg-gray-700/30 transition">
              <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                 <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">👤</div>
                 {rec.name}
              </td>
              <td className="px-6 py-4 font-mono text-sm">{rec.id}</td>
              <td className="px-6 py-4">{rec.offense}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rec.status === 'Wanted' ? 'bg-red-900/50 text-red-300 border border-red-800' :
                  rec.status === 'In Custody' ? 'bg-green-900/50 text-green-300 border border-green-800' :
                  'bg-yellow-900/50 text-yellow-300 border border-yellow-800'
                }`}>
                  {rec.status}
                </span>
              </td>
              <td className="px-6 py-4">
                 <span className={`font-bold ${
                   rec.risk === 'High' ? 'text-red-500' : rec.risk === 'Medium' ? 'text-yellow-500' : 'text-blue-500'
                 }`}>
                   {rec.risk}
                 </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View File</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CommunicationsTab = ({ bulletins }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="border-b border-gray-700 pb-4">
      <h2 className="text-2xl font-bold text-white">Department Communications</h2>
      <p className="text-gray-400">Internal Memos & Shift Briefings</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-lg font-semibold text-white">Bulletins</h3>
        {bulletins.map(bull => (
          <div key={bull.id} className="bg-gray-700/20 border border-gray-600 p-6 rounded-xl">
             <div className="flex justify-between items-start mb-2">
               <h4 className="text-xl font-bold text-white">{bull.title}</h4>
               <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                 bull.priority === 'High' ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-300'
               }`}>{bull.priority} Priority</span>
             </div>
             <p className="text-gray-300 mb-4">{bull.content}</p>
             <p className="text-xs text-gray-500">Posted: {bull.date} • By Dispatch Control</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 h-fit">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Contacts</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded transition cursor-pointer">
            <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-300">📞</div>
            <div>
              <p className="text-white font-medium">Dispatch Main</p>
              <p className="text-gray-400 text-xs">Ext. 9900</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded transition cursor-pointer">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-300">👮‍♂️</div>
            <div>
              <p className="text-white font-medium">Shift Commander</p>
              <p className="text-gray-400 text-xs">Ext. 9901</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded transition cursor-pointer">
            <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-300">🔧</div>
            <div>
              <p className="text-white font-medium">IT Support</p>
              <p className="text-gray-400 text-xs">Ext. 4004</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PoliceDashboard;
