import React, { useEffect, useState } from 'react';
import { getMessages } from '../../services/feedbackService';
import { Search, Mail, Reply, Sparkles, Send } from 'lucide-react';
import { generateSmartReply } from '../../utils/aiReplyGenerator';
import toast from 'react-hot-toast';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Reply state
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

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

  const handleGenerateAiReply = (msg) => {
    const suggestion = generateSmartReply(msg.subject, msg.message, msg.name);
    setReplyContent(suggestion);
    toast.success("AI Reply Generated!");
  };

  const handleSendReply = (msg) => {
    // In a real app, this would call an API email service
    // For now, we simulate sending and open the default mail client
    window.location.href = `mailto:${msg.email}?subject=Re: ${msg.subject}&body=${encodeURIComponent(replyContent)}`;

    toast.success("Opening email client...");
    setReplyingTo(null);
    setReplyContent('');
  };

  const filteredMessages = messages.filter(msg =>
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">User Feedback & Messages</h2>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none w-full sm:w-64 text-gray-900 dark:text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100 dark:divide-slate-700">
        {loading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading messages...</div>
        ) : filteredMessages.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">No messages found.</div>
        ) : (
          filteredMessages.map(msg => (
            <div key={msg.id} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">{msg.subject}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {msg.createdAt?.seconds
                    ? new Date(msg.createdAt.seconds * 1000).toLocaleDateString()
                    : 'Just now'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
                <Mail size={14} />
                <span className="font-medium">{msg.name}</span>
                <span className="text-gray-400 dark:text-gray-500">&lt;{msg.email}&gt;</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg text-sm border border-gray-100 dark:border-slate-600">
                {msg.message}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    if (replyingTo === msg.id) {
                      setReplyingTo(null);
                    } else {
                      setReplyingTo(msg.id);
                      setReplyContent('');
                    }
                  }}
                  className="text-sm flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  <Reply size={16} />
                  {replyingTo === msg.id ? 'Cancel Reply' : 'Reply'}
                </button>
              </div>

              {/* Reply Section */}
              {replyingTo === msg.id && (
                <div className="mt-4 pl-4 border-l-2 border-blue-100 dark:border-blue-900/50 animate-fade-in">
                  <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Reply</label>
                      <button
                        onClick={() => handleGenerateAiReply(msg)}
                        className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                      >
                        <Sparkles size={12} />
                        Auto-Generate Reply
                      </button>
                    </div>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={6}
                      className="w-full p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none mb-3"
                      placeholder="Type your reply here or use AI generation..."
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSendReply(msg)}
                        disabled={!replyContent.trim()}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send size={16} />
                        Send Email
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;
