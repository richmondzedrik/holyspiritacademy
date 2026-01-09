import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addComment, getCommentsByPost } from '../../services/commentService';
import { Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const CommentSection = ({ postId }) => {
  const { currentUser, userData } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingComments, setFetchingComments] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByPost(postId);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setFetchingComments(false);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Please log in to comment');
      return;
    }
    
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      setLoading(true);
      await addComment(
        postId, 
        currentUser.uid, 
        userData?.fullName || 'User', 
        userData?.photoURL || null, 
        newComment
      );
      toast.success('Comment submitted! Awaiting approval.');
      setNewComment('');
      
      // Optionally refetch comments (but pending comments won't show yet)
      const data = await getCommentsByPost(postId);
      setComments(data);
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error('Failed to submit comment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-t border-gray-200 px-6 py-6">
      <div className="max-w-4xl">
        <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MessageCircle className="text-blue-600" size={22} />
          Comments ({comments.length})
        </h4>
        
        {/* Comment Form */}
        {currentUser ? (
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                rows={3}
              />
              <button
                type="submit"
                disabled={loading || !newComment.trim()}
                className="mt-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Post Comment
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              * Your comment will be visible after admin approval.
            </p>
          </form>
        ) : (
          <div className="mb-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl">
            <p className="text-sm text-blue-700">
              Please <a href="/login" className="font-semibold underline hover:text-blue-800">log in</a> to leave a comment.
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {fetchingComments ? (
            <div className="text-center py-4 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200">
              <MessageCircle className="mx-auto mb-2 text-gray-300" size={32} />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <img 
                    src={comment.userProfilePicture || `https://ui-avatars.com/api/?name=${comment.userName}&size=80&background=3b82f6&color=fff`}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full border-2 border-blue-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-semibold text-gray-900">{comment.userName}</h5>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {comment.createdAt?.seconds 
                          ? new Date(comment.createdAt.seconds * 1000).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })
                          : 'Just now'}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
