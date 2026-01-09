import React, { useEffect, useState } from 'react';
import { getAllComments, approveComment, deleteComment } from '../../services/commentService';
import { Search, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getAllComments();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleApprove = async (commentId) => {
    try {
      await approveComment(commentId);
      setComments(comments.map(c => c.id === commentId ? { ...c, isApproved: true } : c));
    } catch (error) {
      alert("Failed to approve comment");
    }
  };

  const handleDelete = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment(commentId);
        setComments(comments.filter(c => c.id !== commentId));
      } catch (error) {
        alert("Failed to delete comment");
      }
    }
  };

  const filteredComments = comments.filter(comment => 
    comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800">Manage Comments</h2>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search comments..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none w-full sm:w-64"
          />
        </div>
      </div>

      {/* List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 font-semibold text-sm">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Comment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">Loading comments...</td>
              </tr>
            ) : filteredComments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">No comments found.</td>
              </tr>
            ) : (
              filteredComments.map(comment => (
                <tr key={comment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{comment.userName}</div>
                    <div className="text-xs text-gray-500">
                      {comment.createdAt?.seconds 
                        ? new Date(comment.createdAt.seconds * 1000).toLocaleDateString() 
                        : 'Just now'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700 max-w-md">{comment.content}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      comment.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {comment.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!comment.isApproved && (
                        <button 
                          onClick={() => handleApprove(comment.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(comment.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete/Decline"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentList;
