import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from '../../services/postService';
import { Plus, Edit2, Trash2, Search, Calendar } from 'lucide-react';
import PostForm from './PostForm';
import { TableRowSkeleton } from '../common/Skeletons';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post");
      }
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingPost(null);
    setIsFormOpen(true);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Manage Announcements</h2>

        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none w-full sm:w-64 text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">New Post</span>
          </button>
        </div>
      </div>

      {/* List */}
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-600 dark:text-gray-400 font-semibold text-sm">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {loading ? (
              [1, 2, 3, 4, 5].map((i) => (
                <TableRowSkeleton key={i} />
              ))
            ) : filteredPosts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500 dark:text-gray-400">No posts found.</td>
              </tr>
            ) : (
              filteredPosts.map(post => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{post.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{post.content}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {post.createdAt?.seconds
                        ? new Date(post.createdAt.seconds * 1000).toLocaleDateString()
                        : 'Just now'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${post.isApproved
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                      {post.isApproved ? 'Published' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 p-4">
        {loading ? (
          [1, 2, 3].map((i) => <div key={i} className="h-32 bg-gray-100 dark:bg-slate-800 animate-pulse rounded-xl" />)
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">No posts found.</div>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{post.title}</h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                    <Calendar size={14} />
                    {post.createdAt?.seconds
                      ? new Date(post.createdAt.seconds * 1000).toLocaleDateString()
                      : 'Just now'}
                  </div>
                </div>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${post.isApproved
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                  {post.isApproved ? 'Published' : 'Pending'}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{post.content}</p>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-slate-700 mt-auto">
                <button
                  onClick={() => handleEdit(post)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isFormOpen && (
        <PostForm
          postToEdit={editingPost}
          onClose={() => setIsFormOpen(false)}
          onSave={fetchPosts}
        />
      )}
    </div>
  );
};

export default PostList;
