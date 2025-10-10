import React, { useState } from 'react';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      officer: 'Officer Smith',
      badgeNumber: 'BADGE-001',
      caseId: 'CR-2024-001',
      lastMessage: 'We have reviewed the CCTV footage and identified a suspect.',
      timestamp: '2 hours ago',
      unread: true,
      messages: [
        { id: 1, sender: 'officer', text: 'Hello, I\'m Officer Smith assigned to your case.', time: '2024-01-15 10:30' },
        { id: 2, sender: 'officer', text: 'We have reviewed the CCTV footage and identified a suspect.', time: '2024-01-18 14:20' }
      ]
    },
    {
      id: 2,
      officer: 'Officer Johnson',
      badgeNumber: 'BADGE-002',
      caseId: 'CR-2024-002',
      lastMessage: 'Can you provide more details about the stolen items?',
      timestamp: '1 day ago',
      unread: false,
      messages: [
        { id: 1, sender: 'officer', text: 'Good morning, I\'m following up on your burglary report.', time: '2024-01-16 09:15' },
        { id: 2, sender: 'officer', text: 'Can you provide more details about the stolen items?', time: '2024-01-17 11:45' },
        { id: 3, sender: 'user', text: 'Yes, I can provide a complete list this evening.', time: '2024-01-17 12:30' }
      ]
    },
    {
      id: 3,
      officer: 'Officer Brown',
      badgeNumber: 'BADGE-003',
      caseId: 'CR-2024-003',
      lastMessage: 'Please upload the requested bank statements when possible.',
      timestamp: '2 days ago',
      unread: false,
      messages: [
        { id: 1, sender: 'officer', text: 'I\'m investigating your fraud case.', time: '2024-01-15 16:20' },
        { id: 2, sender: 'officer', text: 'Please upload the requested bank statements when possible.', time: '2024-01-16 10:10' }
      ]
    }
  ];

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedConversations = [...conversations];
    updatedConversations[selectedConversation].messages.push({
      id: updatedConversations[selectedConversation].messages.length + 1,
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleString()
    });

    setNewMessage('');
    // In real app, you would update state with updatedConversations
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800/60 rounded-2xl border border-gray-700 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Messages</h2>
            <p className="text-gray-400">Communicate with assigned officers</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <div className="lg:col-span-1 bg-gray-700/50 rounded-2xl border border-gray-600 overflow-hidden">
          <div className="p-4 border-b border-gray-600">
            <h3 className="text-lg font-semibold text-white">Conversations</h3>
          </div>
          <div className="overflow-y-auto h-[calc(100%-80px)]">
            {conversations.map((conversation, index) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(index)}
                className={`p-4 border-b border-gray-600 cursor-pointer transition duration-200 ${
                  selectedConversation === index ? 'bg-blue-600/20' : 'hover:bg-gray-600/30'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">👮</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-semibold truncate">{conversation.officer}</h4>
                      {conversation.unread && (
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Case: {conversation.caseId}</p>
                    <p className="text-gray-300 text-sm truncate">{conversation.lastMessage}</p>
                    <p className="text-gray-500 text-xs mt-1">{conversation.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-gray-700/50 rounded-2xl border border-gray-600 overflow-hidden flex flex-col">
          {conversations[selectedConversation] ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-600 bg-gray-800/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">👮</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{conversations[selectedConversation].officer}</h3>
                    <p className="text-gray-400 text-sm">
                      Badge: {conversations[selectedConversation].badgeNumber} • 
                      Case: {conversations[selectedConversation].caseId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversations[selectedConversation].messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl p-4 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-600 text-white rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-600 bg-gray-800/50">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
                  >
                    Send
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-2 text-center">
                  All messages are logged and monitored for security purposes
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No conversation selected</h3>
                <p className="text-gray-400">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700/50 rounded-2xl border border-gray-600 p-4 text-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-xl">📎</span>
          </div>
          <h4 className="text-white font-semibold mb-1">Upload Evidence</h4>
          <p className="text-gray-400 text-sm">Share files with officers</p>
        </div>
        
        <div className="bg-gray-700/50 rounded-2xl border border-gray-600 p-4 text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-xl">📞</span>
          </div>
          <h4 className="text-white font-semibold mb-1">Request Call</h4>
          <p className="text-gray-400 text-sm">Schedule a phone conversation</p>
        </div>
        
        <div className="bg-gray-700/50 rounded-2xl border border-gray-600 p-4 text-center">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-xl">🔔</span>
          </div>
          <h4 className="text-white font-semibold mb-1">Notifications</h4>
          <p className="text-gray-400 text-sm">Manage message alerts</p>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;