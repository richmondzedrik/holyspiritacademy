import React, { useEffect, useState } from 'react';
import { getMessages } from '../../services/feedbackService';
import { Search, Mail } from 'lucide-react';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const data = await getMessages();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(msg => 
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800">User Feedback & Messages</h2>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none w-full sm:w-64"
          />
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading messages...</div>
        ) : filteredMessages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No messages found.</div>
        ) : (
          filteredMessages.map(msg => (
            <div key={msg.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900">{msg.subject}</h3>
                <span className="text-xs text-gray-500">
                  {msg.createdAt?.seconds 
                    ? new Date(msg.createdAt.seconds * 1000).toLocaleDateString() 
                    : 'Just now'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Mail size={14} />
                <span className="font-medium">{msg.name}</span>
                <span className="text-gray-400">&lt;{msg.email}&gt;</span>
              </div>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg text-sm border border-gray-100">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;
