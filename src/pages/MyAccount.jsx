import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserData, updateUserProfile } from '../services/userService';
import { User, Mail, Shield, CheckCircle, XCircle, Camera, Save } from 'lucide-react';
import { ProfileSkeleton } from '../components/common/Skeletons';
import toast from 'react-hot-toast';

const MyAccount = () => {
  const { currentUser, sendVerificationEmail } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    profilePicture: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const data = await getUserData(currentUser.uid);
          setUserData(data);
          setFormData({
            fullName: data.fullName || '',
            profilePicture: data.profilePicture || ''
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUserProfile(currentUser.uid, {
        fullName: formData.fullName,
        profilePicture: formData.profilePicture
      });
      setUserData({ ...userData, ...formData });
      setEditing(false);
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
      toast.success('Verification email sent!');
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error('Failed to send verification email.');
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-fade-in">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <img 
                  src={userData?.profilePicture || `https://ui-avatars.com/api/?name=${userData?.fullName}&size=200&background=3b82f6&color=fff`} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                />
                {editing && (
                  <button 
                    type="button"
                    className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
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
              <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircle className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-bold text-yellow-800 mb-1">Email Not Verified</h3>
                    <p className="text-sm text-yellow-700 mb-3">
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
              <h2 className="text-2xl font-bold text-gray-900">Account Information</h2>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Camera className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      value={formData.profilePicture}
                      onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Use a public image URL (e.g., from Unsplash or Gravatar)
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        fullName: userData?.fullName || '',
                        profilePicture: userData?.profilePicture || ''
                      });
                    }}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <User className="text-blue-600" size={20} />
                      </div>
                      <label className="text-sm font-semibold text-gray-500">Full Name</label>
                    </div>
                    <p className="text-lg font-medium text-gray-900">{userData?.fullName || 'Not set'}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Mail className="text-blue-600" size={20} />
                      </div>
                      <label className="text-sm font-semibold text-gray-500">Email Address</label>
                    </div>
                    <p className="text-lg font-medium text-gray-900">{currentUser?.email}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Shield className="text-blue-600" size={20} />
                      </div>
                      <label className="text-sm font-semibold text-gray-500">Account Role</label>
                    </div>
                    <p className="text-lg font-medium text-gray-900">
                      {userData?.role === 'admin' ? 'Administrator' : 'User'}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        {currentUser?.emailVerified ? (
                          <CheckCircle className="text-green-600" size={20} />
                        ) : (
                          <XCircle className="text-yellow-600" size={20} />
                        )}
                      </div>
                      <label className="text-sm font-semibold text-gray-500">Verification Status</label>
                    </div>
                    <p className="text-lg font-medium text-gray-900">
                      {currentUser?.emailVerified ? 'Verified' : 'Not Verified'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
