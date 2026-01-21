import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserData, updateUserProfile } from '../services/userService';
import { uploadProfileImage } from '../services/imageService';
import { User, Mail, Shield, CheckCircle, XCircle, Camera, Save, Upload, X, Image as ImageIcon } from 'lucide-react';
import { ProfileSkeleton } from '../components/common/Skeletons';
import ImageDropZone from '../components/common/ImageDropZone';
import DefaultAvatars from '../components/common/DefaultAvatars';
import toast from 'react-hot-toast';
import hsabImage from '../assets/hsab.jpg';


const MyAccount = () => {
  const { currentUser, sendVerificationEmail } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    photoURL: ''
  });


  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const data = await getUserData(currentUser.uid);
          setUserData(data);
          setFormData({
            fullName: data.fullName || '',
            photoURL: data.photoURL || ''
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [currentUser]);


  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPG, PNG, GIF, or WebP)');
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleAvatarSelect = (avatarUrl) => {
    setFormData({ ...formData, photoURL: avatarUrl });
    setPreviewUrl(avatarUrl);
    setSelectedFile(null); // Clear any selected file
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let photoURL = formData.photoURL;

      // Upload new image if selected
      if (selectedFile) {
        setUploading(true);
        try {
          photoURL = await uploadProfileImage(currentUser.uid, selectedFile, userData?.photoURL);
          toast.success('Image uploaded successfully!');
        } catch (error) {
          toast.error(error.message || 'Failed to upload image');
          setLoading(false);
          setUploading(false);
          return;
        }
        setUploading(false);
      }

      // Update profile
      await updateUserProfile(currentUser.uid, {
        fullName: formData.fullName,
        photoURL: photoURL
      });

      setUserData({ ...userData, fullName: formData.fullName, photoURL });
      setEditing(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };


  const handleSendVerification = async () => {
    try {
      await sendVerificationEmail();
      toast.success('Verification email sent! Please check your Inbox and Spam folders.');
    } catch (error) {
      console.error("Error sending verification email:", error);
      if (error.code === 'auth/too-many-requests') {
        toast.error('Too many attempts. Please wait a few minutes before trying again.');
      } else {
        toast.error('Failed to send verification email. Please try again later.');
      }
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-12 px-4 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700 animate-fade-in transition-colors">
          {/* Header Section */}
          <div className="px-8 py-12 text-white relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${hsabImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={previewUrl || userData?.photoURL || `https://ui-avatars.com/api/?name=${userData?.fullName}&size=200&background=3b82f6&color=fff`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-700 shadow-xl object-cover"
                />
                {editing && (
                  <button
                    type="button"
                    onClick={() => {
                      // Scroll to the upload section
                      document.getElementById('profile-upload-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    title="Change photo"
                  >
                    <Camera size={20} />
                  </button>
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{userData?.fullName}</h1>
                <p className="text-blue-100 mb-3">{currentUser?.email}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    <Shield size={14} />
                    {userData?.role === 'admin' ? 'Administrator' : 'User'}
                  </span>
                  {currentUser?.emailVerified ? (
                    <span className="inline-flex items-center gap-1 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle size={14} />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      <XCircle size={14} />
                      Not Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {!currentUser?.emailVerified && (
              <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-xl">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircle className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-bold text-yellow-800 dark:text-yellow-200 mb-1">Email Not Verified</h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                      Please verify your email address to access all features.
                    </p>
                    <button
                      onClick={handleSendVerification}
                      className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      Resend Verification Email
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Information</h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div id="profile-upload-section">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Profile Picture</label>

                  <ImageDropZone
                    onFileSelect={handleFileSelect}
                    previewUrl={previewUrl || formData.photoURL}
                    onRemovePreview={handleRemoveImage}
                    maxSize={5 * 1024 * 1024}
                  />

                  <button
                    type="button"
                    onClick={() => setShowAvatarModal(true)}
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                  >
                    <ImageIcon size={18} />
                    Choose Default Avatar
                  </button>

                  {selectedFile && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-3 font-medium flex items-center gap-2">
                      <CheckCircle size={16} />
                      {selectedFile.name} ready to upload
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={20} />
                    {uploading ? 'Uploading...' : loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setFormData({
                        fullName: userData?.fullName || '',
                        photoURL: userData?.photoURL || ''
                      });
                    }}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                        <User className="text-blue-600 dark:text-blue-400" size={20} />
                      </div>
                      <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Full Name</label>
                    </div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">{userData?.fullName || 'Not set'}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                        <Mail className="text-blue-600 dark:text-blue-400" size={20} />
                      </div>
                      <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Email Address</label>
                    </div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">{currentUser?.email}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                        <Shield className="text-blue-600 dark:text-blue-400" size={20} />
                      </div>
                      <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Account Role</label>
                    </div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {userData?.role === 'admin' ? 'Administrator' : 'User'}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                        {currentUser?.emailVerified ? (
                          <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
                        ) : (
                          <XCircle className="text-yellow-600 dark:text-yellow-400" size={20} />
                        )}
                      </div>
                      <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Verification Status</label>
                    </div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {currentUser?.emailVerified ? 'Verified' : 'Not Verified'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Default Avatars Modal */}
      <DefaultAvatars
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        onSelect={handleAvatarSelect}
      />
    </div>
  );
};

export default MyAccount;
