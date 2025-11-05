import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { dataContext } from '../../context/usercontex.jsx';

const ReportCrime = () => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(dataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    incidentType: '',
    date: '',
    time: '',
    location: {
      address: '',
      city: '',
      state: '',
      pincode: ''
    },
    description: '',
    suspectInfo: '',
    witnesses: [],
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Format the date and time
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      // Format witnesses into array of objects
      const witnessesArray = formData.witnesses
        ? formData.witnesses.split('\n').map(witness => {
            const [name, contact, ...statementParts] = witness.split(',').map(str => str.trim());
            return {
              name,
              contact,
              statement: statementParts.join(',').trim()
            };
          })
        : [];

      // Create form data for file upload
      const formDataToSend = new FormData();
      
      // Add files if any
      selectedFiles.forEach((file, index) => {
        formDataToSend.append('evidence', file);
      });

      // Create the crime report data
      const crimeData = {
        title: `${formData.incidentType} Report`,
        description: formData.description,
        location: formData.location,
        incidentDate: dateTime.toISOString(),
        witnesses: witnessesArray,
        suspectInfo: formData.suspectInfo,
        emergency: formData.emergency
      };

      // Add the crime data to form data
      formDataToSend.append('crimeData', JSON.stringify(crimeData));

      // Send the report to the backend
      const response = await axios.post(
        `${serverUrl}/api/crime/report`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        alert('Crime report submitted successfully!');
        navigate('/dashboard/my-cases');
      } else {
        throw new Error(response.data.message || 'Failed to submit report');
      }

      // Reset form
      setFormData({
        title: '',
        incidentType: '',
        date: '',
        time: '',
        location: {
          address: '',
          city: '',
          state: '',
          pincode: ''
        },
        description: '',
        suspectInfo: '',
        witnesses: [],
        emergency: false
      });
      setSelectedFiles([]);
      
    } catch (error) {
      setError(error.message || 'Failed to submit crime report');
      console.error('Error submitting report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
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

          {/* Location Fields */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white mb-2">
                Address *
              </label>
              <input
                type="text"
                name="location.address"
                value={formData.location.address}
                onChange={handleChange}
                required
                placeholder="Enter street address"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                City *
              </label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                required
                placeholder="Enter city"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                State *
              </label>
              <input
                type="text"
                name="location.state"
                value={formData.location.state}
                onChange={handleChange}
                required
                placeholder="Enter state"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Pincode *
              </label>
              <input
                type="text"
                name="location.pincode"
                value={formData.location.pincode}
                onChange={handleChange}
                required
                placeholder="Enter pincode"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="evidence-upload"
            accept="image/*,video/*,.pdf,.doc,.docx"
          />
          <label
            htmlFor="evidence-upload"
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg border border-gray-600 transition duration-200 cursor-pointer inline-block"
          >
            Choose Files
          </label>
          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-300">Selected files:</p>
              <ul className="text-sm text-gray-400">
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center text-blue-400">
            Submitting report, please wait...
          </div>
        )}

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