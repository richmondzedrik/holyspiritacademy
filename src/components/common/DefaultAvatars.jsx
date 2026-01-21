import React, { useState } from 'react';
import { X } from 'lucide-react';

const DEFAULT_AVATARS = [
    { id: 1, url: 'https://ui-avatars.com/api/?name=A&size=200&background=3b82f6&color=fff&bold=true', name: 'Blue A' },
    { id: 2, url: 'https://ui-avatars.com/api/?name=B&size=200&background=10b981&color=fff&bold=true', name: 'Green B' },
    { id: 3, url: 'https://ui-avatars.com/api/?name=C&size=200&background=f59e0b&color=fff&bold=true', name: 'Orange C' },
    { id: 4, url: 'https://ui-avatars.com/api/?name=D&size=200&background=ef4444&color=fff&bold=true', name: 'Red D' },
    { id: 5, url: 'https://ui-avatars.com/api/?name=E&size=200&background=8b5cf6&color=fff&bold=true', name: 'Purple E' },
    { id: 6, url: 'https://ui-avatars.com/api/?name=F&size=200&background=ec4899&color=fff&bold=true', name: 'Pink F' },
    { id: 7, url: 'https://ui-avatars.com/api/?name=G&size=200&background=06b6d4&color=fff&bold=true', name: 'Cyan G' },
    { id: 8, url: 'https://ui-avatars.com/api/?name=H&size=200&background=84cc16&color=fff&bold=true', name: 'Lime H' },
    { id: 9, url: 'https://ui-avatars.com/api/?name=I&size=200&background=f97316&color=fff&bold=true', name: 'Amber I' },
    { id: 10, url: 'https://ui-avatars.com/api/?name=J&size=200&background=14b8a6&color=fff&bold=true', name: 'Teal J' },
    { id: 11, url: 'https://ui-avatars.com/api/?name=K&size=200&background=6366f1&color=fff&bold=true', name: 'Indigo K' },
    { id: 12, url: 'https://ui-avatars.com/api/?name=L&size=200&background=a855f7&color=fff&bold=true', name: 'Violet L' },
];

const DefaultAvatars = ({ isOpen, onClose, onSelect }) => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    if (!isOpen) return null;

    const handleSelect = () => {
        if (selectedAvatar) {
            onSelect(selectedAvatar.url);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Default Avatar</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        <X size={24} className="text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Avatar Grid */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {DEFAULT_AVATARS.map((avatar) => (
                            <button
                                key={avatar.id}
                                onClick={() => setSelectedAvatar(avatar)}
                                className={`relative aspect-square rounded-xl overflow-hidden transition-all ${selectedAvatar?.id === avatar.id
                                    ? 'ring-4 ring-blue-500 scale-105'
                                    : 'hover:scale-105 hover:shadow-lg'
                                    }`}
                            >
                                <img
                                    src={avatar.url}
                                    alt={avatar.name}
                                    className="w-full h-full object-cover"
                                />
                                {selectedAvatar?.id === avatar.id && (
                                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                        <div className="bg-blue-500 text-white rounded-full p-1">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-slate-700">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSelect}
                        disabled={!selectedAvatar}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                        Select Avatar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DefaultAvatars;
