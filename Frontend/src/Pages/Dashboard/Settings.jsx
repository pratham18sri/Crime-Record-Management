import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    locationSharing: true
  });

  const handleProfileSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return <ProfileTab 
          data={profileData} 
          setData={setProfileData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onSave={handleProfileSave}
        />;
      case 'preferences':
        return <PreferencesTab 
          data={preferences} 
          setData={setPreferences}
          onToggle={handleToggle}
        />;
      default:
        return <ProfileTab 
          data={profileData} 
          setData={setProfileData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onSave={handleProfileSave}
        />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Account Settings</h2>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-700/50 rounded-2xl border border-gray-600 p-6">
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'Profile Information', icon: '👤' },
                { id: 'preferences', label: 'Notifications', icon: '🔔' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-600 hover:text-white'
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Account Status */}
            <div className="mt-8 p-4 bg-green-900/20 rounded-xl border border-green-700">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-300 text-sm font-semibold">Account Active</span>
              </div>
              <p className="text-green-200 text-xs">
                Your account is in good standing with full access to all features.
              </p>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-700/50 rounded-2xl border border-gray-600 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = ({ data, setData, isEditing, setIsEditing, onSave }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Profile Information</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-white mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-white mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-white mb-2">
            Address
          </label>
          <textarea
            name="address"
            value={data.address}
            onChange={handleChange}
            disabled={!isEditing}
            rows={3}
            className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-vertical"
          />
        </div>
      </div>
    </div>
  );
};

// Preferences Tab Component
const PreferencesTab = ({ data, onToggle }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Notification Preferences</h3>
      
      <div className="space-y-4">
        {[
          { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive case updates via email' },
          { key: 'smsNotifications', label: 'SMS Notifications', description: 'Get text message alerts for urgent updates' },
          { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser notifications for real-time updates' },
          { key: 'locationSharing', label: 'Location Sharing', description: 'Allow location sharing for emergency services' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-600/30 rounded-xl border border-gray-500">
            <div className="flex-1">
              <h4 className="text-white font-semibold">{item.label}</h4>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
            <button
              onClick={() => onToggle(item.key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                data[item.key] ? 'bg-blue-600' : 'bg-gray-500'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  data[item.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;