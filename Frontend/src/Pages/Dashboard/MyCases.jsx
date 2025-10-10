import React, { useState } from 'react';

const MyCases = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock cases data
  const cases = [
    {
      id: 'CR-2024-001',
      title: 'Vehicle Theft',
      status: 'investigating',
      priority: 'high',
      assignedOfficer: 'Officer Smith',
      dateReported: '2024-01-15',
      lastUpdate: '2024-01-18',
      description: 'Car stolen from parking lot',
      updates: [
        { date: '2024-01-18', message: 'CCTV footage under review', officer: 'Officer Smith' },
        { date: '2024-01-16', message: 'Case assigned for investigation', officer: 'Dispatch' }
      ]
    },
    {
      id: 'CR-2024-002',
      title: 'Burglary Report',
      status: 'pending',
      priority: 'medium',
      assignedOfficer: 'Officer Johnson',
      dateReported: '2024-01-14',
      lastUpdate: '2024-01-14',
      description: 'Home break-in while away',
      updates: [
        { date: '2024-01-14', message: 'Report received and queued for review', officer: 'Dispatch' }
      ]
    },
    {
      id: 'CR-2024-003',
      title: 'Fraud Case',
      status: 'evidence_required',
      priority: 'high',
      assignedOfficer: 'Officer Brown',
      dateReported: '2024-01-13',
      lastUpdate: '2024-01-17',
      description: 'Online banking fraud',
      updates: [
        { date: '2024-01-17', message: 'Additional bank statements requested', officer: 'Officer Brown' },
        { date: '2024-01-15', message: 'Initial evidence reviewed', officer: 'Officer Brown' }
      ]
    },
    {
      id: 'CR-2024-004',
      title: 'Vandalism',
      status: 'resolved',
      priority: 'low',
      assignedOfficer: 'Officer Davis',
      dateReported: '2024-01-10',
      lastUpdate: '2024-01-12',
      description: 'Property damage to vehicle',
      updates: [
        { date: '2024-01-12', message: 'Case closed - suspect identified', officer: 'Officer Davis' },
        { date: '2024-01-11', message: 'Evidence collected from scene', officer: 'Officer Davis' }
      ]
    }
  ];

  const filteredCases = cases.filter(caseItem => {
    const matchesFilter = filter === 'all' || caseItem.status === filter;
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'investigating': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'pending': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'evidence_required': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800/60 rounded-2xl border border-gray-700 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">My Cases</h2>
            <p className="text-gray-400">Track and manage your reported cases</p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'investigating', 'evidence_required', 'resolved'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                    filter === status
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {status.replace('_', ' ').toUpperCase()}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          {/* Cases Grid */}
          <div className="grid gap-6">
            {filteredCases.map(caseItem => (
              <div key={caseItem.id} className="bg-gray-700/50 rounded-2xl border border-gray-600 overflow-hidden">
                {/* Case Header */}
                <div className="p-6 border-b border-gray-600">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{caseItem.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(caseItem.status)}`}>
                          {caseItem.status.replace('_', ' ')}
                        </span>
                        <span className={`text-sm font-medium ${getPriorityColor(caseItem.priority)}`}>
                          {caseItem.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                      <p className="text-gray-400">Case ID: {caseItem.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-300 text-sm">Assigned Officer</p>
                      <p className="text-white font-semibold">{caseItem.assignedOfficer}</p>
                    </div>
                  </div>
                </div>

                {/* Case Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Description</h4>
                      <p className="text-gray-300">{caseItem.description}</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Case Timeline</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Reported:</span>
                          <span className="text-white">{caseItem.dateReported}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Last Update:</span>
                          <span className="text-white">{caseItem.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Updates */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">Case Updates</h4>
                    <div className="space-y-3">
                      {caseItem.updates.map((update, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-600/30 rounded-lg">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs">👮</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-white font-medium">{update.officer}</p>
                              <span className="text-gray-400 text-sm">{update.date}</span>
                            </div>
                            <p className="text-gray-300 text-sm">{update.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 bg-gray-800 border-t border-gray-600">
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition duration-200">
                      Send Message
                    </button>
                    <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm font-medium transition duration-200">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition duration-200">
                      Upload Evidence
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No cases found</h3>
              <p className="text-gray-400">
                {searchTerm ? 'Try adjusting your search terms' : 'You haven\'t filed any reports yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCases;