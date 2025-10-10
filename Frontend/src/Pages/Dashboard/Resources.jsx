import React, { useState } from 'react';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('safety');

  const resources = {
    safety: [
      {
        title: 'Personal Safety Tips',
        description: 'Essential safety measures for daily activities',
        type: 'guide',
        icon: '🛡️'
      },
      {
        title: 'Home Security Checklist',
        description: 'Secure your home against burglaries',
        type: 'checklist',
        icon: '🏠'
      },
      {
        title: 'Cyber Safety Guide',
        description: 'Protect yourself from online crimes',
        type: 'guide',
        icon: '💻'
      }
    ],
    emergency: [
      {
        title: 'Emergency Procedures',
        description: 'What to do in different emergency situations',
        type: 'procedure',
        icon: '🚨'
      },
      {
        title: 'Emergency Contacts',
        description: 'Important phone numbers and contacts',
        type: 'directory',
        icon: '📞'
      }
    ],
    legal: [
      {
        title: 'Victim Rights',
        description: 'Know your rights as a crime victim',
        type: 'rights',
        icon: '⚖️'
      },
      {
        title: 'Legal Procedures',
        description: 'Understanding the legal process',
        type: 'guide',
        icon: '📋'
      }
    ]
  };

  const emergencyContacts = [
    { name: 'Police Emergency', number: '911', description: 'Immediate police response' },
    { name: 'Non-Emergency Police', number: '311', description: 'General police inquiries' },
    { name: 'Crime Stoppers', number: '1-800-222-8477', description: 'Anonymous crime reporting' }
  ];

  const getTypeColor = (type) => {
    switch(type) {
      case 'guide': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'checklist': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'procedure': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'directory': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'rights': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Safety Resources</h2>
        <p className="text-gray-400">Important information and support services</p>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-2xl border border-red-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl">🚨</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Emergency Contacts</h3>
            <p className="text-red-200">Immediate assistance and support</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-red-900/20 rounded-xl border border-red-800 p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-semibold">{contact.name}</h4>
                <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition duration-200">
                  Call
                </button>
              </div>
              <p className="text-red-300 text-2xl font-bold mb-1">{contact.number}</p>
              <p className="text-red-200 text-sm">{contact.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-700/50 rounded-2xl border border-gray-600 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <nav className="space-y-2">
              {[
                { id: 'safety', label: 'Safety Guides', icon: '🛡️' },
                { id: 'emergency', label: 'Emergency Info', icon: '🚨' },
                { id: 'legal', label: 'Legal Resources', icon: '⚖️' }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-600 hover:text-white'
                  }`}
                >
                  <span className="text-lg mr-3">{category.icon}</span>
                  <span className="font-medium">{category.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="lg:col-span-3">
          <div className="bg-gray-700/50 rounded-2xl border border-gray-600 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              {activeCategory === 'safety' && 'Safety Guides'}
              {activeCategory === 'emergency' && 'Emergency Information'}
              {activeCategory === 'legal' && 'Legal Resources'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources[activeCategory].map((resource, index) => (
                <div key={index} className="bg-gray-600/30 rounded-2xl border border-gray-500 p-6 hover:border-gray-400 transition duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{resource.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold text-lg">{resource.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(resource.type)}`}>
                          {resource.type}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{resource.description}</p>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition duration-200">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white text-sm rounded-lg transition duration-200">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;