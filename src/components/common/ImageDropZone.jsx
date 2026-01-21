import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageDropZone = ({ onFileSelect, accept = 'image/*', maxSize = 5 * 1024 * 1024, previewUrl, onRemovePreview }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    }, []);

    const handleDragOut = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const validateFile = (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            return 'Please upload an image file';
        }

        // Validate file size
        if (file.size > maxSize) {
            const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
            return `File size must be less than ${maxSizeMB}MB`;
        }

        return null;
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            const error = validateFile(file);

            if (error) {
                alert(error);
                return;
            }

            // Pass the event object to parent
            onFileSelect({ target: { files: [file] } });
        }
    }, [onFileSelect, maxSize]);

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const error = validateFile(file);

            if (error) {
                alert(error);
                return;
            }

            // Pass the event object to parent
            onFileSelect(e);
        }
    };

    return (
        <div className="space-y-4">
            {/* Preview */}
            {previewUrl && (
                <div className="relative inline-block">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-slate-600"
                    />
                    <button
                        type="button"
                        onClick={onRemovePreview}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        title="Remove image"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Drop Zone */}
            <div
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${isDragging
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
                    : 'border-gray-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                    }`}
            >
                <input
                    type="file"
                    accept={accept}
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="drop-zone-input"
                />

                <div className="flex flex-col items-center gap-3 pointer-events-none">
                    <div className={`p-4 rounded-full transition-colors ${isDragging
                        ? 'bg-blue-100 dark:bg-blue-900/40'
                        : 'bg-gray-100 dark:bg-slate-700'
                        }`}>
                        {isDragging ? (
                            <Upload className="text-blue-600 dark:text-blue-400" size={32} />
                        ) : (
                            <ImageIcon className="text-gray-400 dark:text-gray-500" size={32} />
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            {isDragging ? 'Drop image here' : 'Drag & drop your image here'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            or click to browse
                        </p>
                    </div>

                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        Supported: JPG, PNG, GIF, WebP (Max {(maxSize / (1024 * 1024)).toFixed(0)}MB)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageDropZone;
