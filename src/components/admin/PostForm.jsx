import React, { useState, useEffect } from 'react';
import { createPost, updatePost } from '../../services/postService';
import { X, Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useStorage from '../../hooks/useStorage';
import toast from 'react-hot-toast';

const PostForm = ({ postToEdit, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { uploadFile, isUploading, progress } = useStorage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setImageUrl(postToEdit.imageUrl || '');
      setPreviewUrl(postToEdit.imageUrl || null);
    }
  }, [postToEdit]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast.error("File size must be less than 50MB");
        return;
      }
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = imageUrl;

      if (selectedFile) {
        const uploadedUrl = await uploadFile(selectedFile, 'posts');
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        } else {
          setLoading(false);
          return;
        }
      }

      if (postToEdit) {
        await updatePost(postToEdit.id, {
          title,
          content,
          imageUrl: finalImageUrl || null
        });
        toast.success('Post updated successfully');
      } else {
        await createPost(title, content, finalImageUrl || null, currentUser.uid);
        toast.success('Post created successfully');
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {postToEdit ? 'Edit Announcement' : 'New Announcement'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-grow max-h-[60vh] md:max-h-none">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="e.g., School Festival 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all resize-none text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="Write the announcement details here..."
            />
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Announcement Image (Max 50MB)</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl p-4 text-center hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto h-48 object-cover rounded-lg shadow-sm"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full cursor-pointer hover:bg-black/70" onClick={(e) => {
                    e.preventDefault();
                    setPreviewUrl(null);
                    setSelectedFile(null);
                    setImageUrl('');
                  }}>
                    <X size={16} />
                  </div>
                </div>
              ) : (
                <div className="py-8 text-gray-400">
                  <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Click or drag image to upload</p>
                </div>
              )}
            </div>
            {isUploading && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{Math.round(progress)}%</p>
              </div>
            )}
          </div>
        </form>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-100 dark:border-slate-700 flex-shrink-0 bg-gray-50 dark:bg-slate-800/50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || isUploading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              'Saving...'
            ) : (
              <>
                <Save size={18} />
                Save Post
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
