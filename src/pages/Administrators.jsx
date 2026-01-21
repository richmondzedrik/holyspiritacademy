import React, { useState, useMemo, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Users, Search, Edit, Plus, Trash2, Save, X, Camera } from 'lucide-react';
import { PageHeaderSkeleton, AdministratorCardSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';
import { useAuth } from '../context/AuthContext';
import { getSchoolAdministrators, addAdministratorMember, updateAdministratorMember, deleteAdministratorMember } from '../services/schoolAdminService';
import { uploadImage } from '../services/imageService';
import Modal from '../components/common/Modal';
import ImageDropZone from '../components/common/ImageDropZone';
import toast from 'react-hot-toast';

const Administrators = () => {
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentMember, setCurrentMember] = useState(null); // If null, we are adding new
  const [formData, setFormData] = useState({ name: '', position: '', image: null });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getSchoolAdministrators();
      setAdminData(data);
    } catch (error) {
      console.error("Error fetching administrators:", error);
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  // Function to get initials from name
  const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Function to get avatar color based on category
  const getAvatarColor = (categoryTitle) => {
    const title = categoryTitle.toLowerCase();
    if (title.includes('board')) return 'from-purple-500 to-purple-600';
    if (title.includes('diocesan')) return 'from-indigo-500 to-indigo-600';
    if (title.includes('high school')) return 'from-cyan-500 to-cyan-600';
    if (title.includes('grade school')) return 'from-green-500 to-green-600'; // Specific check before Administration
    if (title.includes('administration')) return 'from-blue-500 to-blue-600';
    return 'from-gray-500 to-gray-600';
  };

  // Filter administrators based on active tab and search
  const filteredAdministrators = useMemo(() => {
    let filtered = adminData;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = adminData.filter(cat => {
        const title = cat.title.toLowerCase();
        if (activeTab === 'board') return title.includes('board');
        if (activeTab === 'dso') return title.includes('diocesan');
        if (activeTab === 'elementary') return title.includes('grade school');
        if (activeTab === 'highschool') return title.includes('high school') && !title.includes('grade school'); // Ensure distinction
        return true;
      });
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.map(cat => ({
        ...cat,
        members: cat.members.filter(member =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (member.position && member.position.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      })).filter(cat => cat.members.length > 0);
    }

    return filtered;
  }, [activeTab, searchQuery, adminData]);

  const tabs = [
    { id: 'all', label: 'All', icon: Users },
    { id: 'board', label: 'Board of Trustees', icon: Users },
    { id: 'dso', label: 'DSO', icon: Users },
    { id: 'elementary', label: 'Elementary', icon: Users },
    { id: 'highschool', label: 'High School', icon: Users },
  ];

  // --- CRUD Handlers ---

  const handleOpenAddModal = (category) => {
    setCurrentCategory(category);
    setCurrentMember(null);
    setFormData({ name: '', position: '', image: null });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category, member) => {
    setCurrentCategory(category);
    setCurrentMember(member);
    setFormData({ name: member.name, position: member.position, image: member.image });
    setImageFile(null);
    setImagePreview(member.image);
    setIsModalOpen(true);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !currentCategory) {
      toast.error("Name is required");
      return;
    }

    try {
      setIsSaving(true);
      let imageUrl = formData.image;

      if (imageFile) {
        // Upload new image
        imageUrl = await uploadImage('admin-photos', imageFile, currentMember?.image);
      }

      const memberData = {
        ...formData,
        image: imageUrl
      };

      if (currentMember) {
        // Update
        const updatedMember = { ...currentMember, ...memberData };
        await updateAdministratorMember(currentCategory.id, updatedMember, currentCategory.members);

        // Optimistic Update
        setAdminData(prev => prev.map(cat => {
          if (cat.id === currentCategory.id) {
            return {
              ...cat,
              members: cat.members.map(m => m.id === currentMember.id ? updatedMember : m)
            };
          }
          return cat;
        }));
        toast.success("Updated successfully");
      } else {
        // Create
        const newMember = await addAdministratorMember(currentCategory.id, memberData);

        // Optimistic Update
        setAdminData(prev => prev.map(cat => {
          if (cat.id === currentCategory.id) {
            return {
              ...cat,
              members: [...cat.members, newMember]
            };
          }
          return cat;
        }));
        toast.success("Added successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (category, memberId) => {
    if (!window.confirm("Are you sure you want to delete this person?")) return;

    try {
      await deleteAdministratorMember(category.id, memberId, category.members);
      // Optimistic Update
      setAdminData(prev => prev.map(cat => {
        if (cat.id === category.id) {
          return {
            ...cat,
            members: cat.members.filter(m => m.id !== memberId)
          };
        }
        return cat;
      }));
      toast.success("Deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete.");
    }
  };

  if (loading) {
    return (
      <>
        <SEO
          title="School Administrators - Holy Spirit Academy of Bangued"
          description="Meet the dedicated administrators leading Holy Spirit Academy of Bangued towards educational excellence."
          keywords="administrators, school leadership, principal, vice principal, Holy Spirit Academy"
        />
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-24 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {[1, 2, 3, 4].map((i) => (
                <AdministratorCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="School Administrators and Faculties - Holy Spirit Academy of Bangued"
        description="Meet the dedicated administrators leading Holy Spirit Academy of Bangued towards educational excellence."
        keywords="administrators, school leadership, principal, vice principal, Holy Spirit Academy"
      />
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-24 pb-16">
        {/* Hero Header */}
        <div className="text-white py-20 mb-12 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${hsabImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <FadeIn>
              <div className="text-center relative">
                {isAdmin && (
                  <div className="absolute right-0 top-0">
                    <button
                      onClick={() => setIsEditMode(!isEditMode)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${isEditMode ? 'bg-yellow-400 text-black' : 'bg-white/20 hover:bg-white/30 backdrop-blur-md'}`}
                    >
                      <Edit size={16} />
                      {isEditMode ? 'Done Editing' : 'Edit Mode'}
                    </button>
                  </div>
                )}
                <div className="inline-block mb-6">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-3xl border border-white/30 shadow-xl">
                    <Users className="text-white" size={40} />
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  School Administrators and Faculties
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                  Meet the dedicated leaders who guide our school towards excellence in education.
                </p>
              </div>
            </FadeIn>
          </div>
        </div >

        <div className="max-w-7xl mx-auto px-4">
          {/* Search and Filter Section */}
          <FadeIn delay={100}>
            <div className="mb-12 space-y-6">
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search by name or position..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                      }`}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Administrators Grid */}
          <div className="space-y-20">
            {filteredAdministrators.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-block p-6 bg-gray-100 dark:bg-slate-800 rounded-full mb-4">
                  <Search className="text-gray-400 dark:text-gray-500" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              filteredAdministrators.map((category, categoryIdx) => (
                <div key={category.id || categoryIdx} className="space-y-8 relative p-4 rounded-3xl border border-transparent transition-colors duration-300">
                  {isEditMode && (
                    <div className="absolute top-0 right-0 p-4 opacity-50 hover:opacity-100 transition-opacity">
                      {/* Future: Add Delete/Edit Category Button */}
                    </div>
                  )}

                  <FadeIn delay={categoryIdx * 50}>
                    <div className="text-center mb-10 flex flex-col items-center">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 relative inline-block">
                        {category.title}
                        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></span>
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-4">{category.members.length} member{category.members.length !== 1 ? 's' : ''}</p>

                      {isEditMode && (
                        <button
                          onClick={() => handleOpenAddModal(category)}
                          className="mt-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all hover:scale-105"
                        >
                          <Plus size={18} />
                          Add Member
                        </button>
                      )}
                    </div>
                  </FadeIn>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {category.members.map((member, index) => (
                      <FadeIn key={member.id} delay={(categoryIdx * 50) + (index * 30)}>
                        <div className={`group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-slate-700 h-full flex flex-col items-center relative overflow-hidden ${isEditMode ? 'ring-2 ring-blue-500/30' : ''}`}>

                          {isEditMode && (
                            <div className="absolute top-2 right-2 flex gap-2 z-20">
                              <button
                                onClick={() => handleOpenEditModal(category, member)}
                                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-colors"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(category, member.id)}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}

                          {/* Avatar */}
                          <div className="relative mb-5 w-28 h-28">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                            <div className={`relative w-full h-full rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${getAvatarColor(category.title)} flex items-center justify-center`}>
                              {member.image ? (
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-white text-2xl font-bold">
                                  {getInitials(member.name)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Name */}
                          <h3 className="text-center text-base font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors px-2">
                            {member.name}
                          </h3>

                          {/* Position Badge */}
                          {member.position && (
                            <div className="mt-auto pt-3 w-full">
                              <span className="block text-center bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 px-3 py-2 rounded-lg text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800/50">
                                {member.position}
                              </span>
                            </div>
                          )}
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div >

      {/* Edit/Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => !isSaving && setIsModalOpen(false)}
        title={currentMember ? 'Edit Administrator' : 'Add New Administrator'}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Photo</label>
              <ImageDropZone
                onFileSelect={handleFileSelect}
                previewUrl={imagePreview}
                onRemovePreview={() => {
                  setImagePreview(null);
                  setImageFile(null);
                  setFormData(p => ({ ...p, image: null }));
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. Juan De La Cruz"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position / Title</label>
            <input
              type="text"
              value={formData.position}
              onChange={e => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. Principal"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Record
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Administrators;
