import React, { useState } from 'react';

const ReportCrime = () => {
  const [formData, setFormData] = useState({
    incidentType: '',
    date: '',
    time: '',
    location: '',
    description: '',
    suspectInfo: '',
    witnesses: '',
    emergency: false
  });

  const incidentTypes = [
    'Theft/Burglary',
    'Assault',
    'Fraud/Scam',
    'Vandalism',
    'Harassment',
    'Vehicle Crime',
    'Cyber Crime',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Crime report submitted successfully! Case ID: CR-' + Date.now());
    // Reset form
    setFormData({
      incidentType: '',
      date: '',
      time: '',
      location: '',
      description: '',
      suspectInfo: '',
      witnesses: '',
      emergency: false
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800/60 rounded-2xl border border-gray-700 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">File Crime Report</h2>
            <div className="flex items-center space-x-2 text-yellow-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-sm">Provide accurate information</span>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">⚠️</span>
              </div>
              <div>
                <h3 className="text-yellow-300 font-semibold">Important Notice</h3>
                <p className="text-yellow-200 text-sm">
                  False reporting is a criminal offense. Please provide truthful and accurate information.
                  In case of emergency, call emergency services immediately.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Incident Type */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-white mb-2">
              Incident Type *
            </label>
            <select
              name="incidentType"
              value={formData.incidentType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select incident type</option>
              {incidentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Date of Incident *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Time of Incident *
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-white mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter exact location or address"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-white mb-2">
              Incident Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Provide detailed description of what happened..."
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
          </div>

          {/* Suspect Information */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-white mb-2">
              Suspect Information (if known)
            </label>
            <textarea
              name="suspectInfo"
              value={formData.suspectInfo}
              onChange={handleChange}
              rows={3}
              placeholder="Describe suspect appearance, clothing, vehicle, etc."
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
          </div>

          {/* Witnesses */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-white mb-2">
              Witness Information
            </label>
            <textarea
              name="witnesses"
              value={formData.witnesses}
              onChange={handleChange}
              rows={2}
              placeholder="Names and contact information of witnesses"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
          </div>

          {/* Emergency Checkbox */}
          <div className="md:col-span-2">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="emergency"
                checked={formData.emergency}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="text-red-400 font-semibold">
                This is an emergency requiring immediate police response
              </span>
            </label>
          </div>
        </div>

        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-600 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📎</span>
          </div>
          <h4 className="text-white font-semibold mb-2">Upload Evidence</h4>
          <p className="text-gray-400 text-sm mb-4">
            Upload photos, videos, or documents related to the incident
          </p>
          <button
            type="button"
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg border border-gray-600 transition duration-200"
          >
            Choose Files
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
          <button
            type="button"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg border border-gray-600 transition duration-200"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-200"
          >
            Submit Report
          </button>
        </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportCrime;