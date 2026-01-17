import React, { useState, useEffect } from 'react';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../services/eventService';
import { Plus, Edit2, Trash2, Calendar, MapPin, Clock, Search, X, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import FadeIn from '../common/FadeIn';
import toast from 'react-hot-toast';
import useStorage from '../../hooks/useStorage';
import { TableRowSkeleton } from '../common/Skeletons';

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { uploadFile, isUploading, progress } = useStorage();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        date: '',
        time: '',
        location: '',
        category: '',
        description: '',
        imageUrl: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            toast.error("Failed to load events");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (event = null) => {
        if (event) {
            setFormData({
                id: event.id,
                title: event.title || '',
                date: event.date || '',
                time: event.time || '',
                location: event.location || '',
                category: event.category || '',
                description: event.description || '',
                imageUrl: event.imageUrl || ''
            });
            setPreviewUrl(event.imageUrl || null);
        } else {
            setFormData({
                id: null,
                title: '',
                date: '',
                time: '',
                location: '',
                category: '',
                description: '',
                imageUrl: ''
            });
            setPreviewUrl(null);
        }
        setSelectedFile(null);
        setIsModalOpen(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Create local preview
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = formData.imageUrl;

            if (selectedFile) {
                const uploadedUrl = await uploadFile(selectedFile, 'events');
                if (uploadedUrl) {
                    imageUrl = uploadedUrl;
                } else {
                    // Upload failed (handled by hook's error state typically, but safe to return here)
                    return;
                }
            }

            if (formData.id) {
                await updateEvent(formData.id, { ...formData, imageUrl });
                toast.success("Event updated successfully");
            } else {
                await addEvent(
                    formData.title,
                    formData.date,
                    formData.time,
                    formData.location,
                    formData.category,
                    formData.description,
                    imageUrl
                );
                toast.success("Event added successfully");
            }
            setIsModalOpen(false);
            fetchEvents();
        } catch (error) {
            console.error(error);
            toast.error("Failed to save event");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await deleteEvent(id);
                toast.success("Event deleted successfully");
                fetchEvents();
            } catch (error) {
                toast.error("Failed to delete event");
            }
        }
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Events</h1>
                    <p className="text-gray-600 dark:text-gray-400">Add, edit, or remove upcoming school events.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
                >
                    <Plus size={20} />
                    Add Event
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    />
                </div>

                {loading ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-slate-700 text-gray-500 dark:text-gray-400 text-sm">
                                    <th className="py-4 px-4 font-semibold">Title</th>
                                    <th className="py-4 px-4 font-semibold">Date & Time</th>
                                    <th className="py-4 px-4 font-semibold">Location</th>
                                    <th className="py-4 px-4 font-semibold">Category</th>
                                    <th className="py-4 px-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <TableRowSkeleton key={i} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : filteredEvents.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-slate-700 text-gray-500 dark:text-gray-400 text-sm">
                                    <th className="py-4 px-4 font-semibold">Title</th>
                                    <th className="py-4 px-4 font-semibold">Date & Time</th>
                                    <th className="py-4 px-4 font-semibold">Location</th>
                                    <th className="py-4 px-4 font-semibold">Category</th>
                                    <th className="py-4 px-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
                                {filteredEvents.map((event) => (
                                    <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">{event.title}</td>
                                        <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                                            <div className="flex flex-col text-sm">
                                                <span>{event.date}</span>
                                                <span className="text-gray-400 dark:text-gray-500 text-xs">{event.time}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600 dark:text-gray-300 text-sm">{event.location}</td>
                                        <td className="py-4 px-4">
                                            <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                                                {event.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(event)}
                                                    className="p-2 text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="p-2 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        No events found.
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6 md:p-8 relative border border-gray-100 dark:border-slate-700">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-all"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {formData.id ? 'Edit Event' : 'Add New Event'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                    placeholder="e.g. Foundation Day"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="time"
                                            required
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            required
                                            list="location-options"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                            placeholder="Choose or type location..."
                                        />
                                        <datalist id="location-options">
                                            <option value="Gymnasium" />
                                            <option value="School Grounds" />
                                            <option value="Audio Visual Room" />
                                            <option value="Main Hall" />
                                            <option value="Library" />
                                            <option value="Science Lab" />
                                            <option value="Computer Lab" />
                                            <option value="Function Hall" />
                                        </datalist>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                    <input
                                        type="text"
                                        required
                                        list="category-options"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                        placeholder="Choose or type category..."
                                    />
                                    <datalist id="category-options">
                                        <option value="Academic" />
                                        <option value="Sports" />
                                        <option value="Cultural" />
                                        <option value="Arts" />
                                        <option value="Meeting" />
                                        <option value="Holiday" />
                                        <option value="Celebration" />
                                        <option value="Announcement" />
                                    </datalist>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Image (Max 25MB)</label>
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
                                                setFormData({ ...formData, imageUrl: '' });
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-24 resize-none text-gray-900 dark:text-white placeholder-gray-400"
                                    placeholder="Brief details about the event..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Reading...
                                        </>
                                    ) : (
                                        formData.id ? 'Save Changes' : 'Add Event'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminEvents;
