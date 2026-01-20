import { useState } from 'react';
import { storage } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

const useStorage = () => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const uploadFile = async (file, path = 'images') => {
        setError(null);
        setIsUploading(true);
        setProgress(0);

        // Validation
        if (!file) {
            setError('Please select a file');
            setIsUploading(false);
            return null;
        }

        if (!file.type.includes('image')) {
            const msg = 'Please select an image file (png, jpg, jpeg)';
            setError(msg);
            toast.error(msg);
            setIsUploading(false);
            return null;
        }

        // 50MB limit
        const MAX_SIZE = 50 * 1024 * 1024; // 50MB in bytes
        if (file.size > MAX_SIZE) {
            const msg = 'File size must be less than 50MB';
            setError(msg);
            toast.error(msg);
            setIsUploading(false);
            return null;
        }

        return new Promise((resolve, reject) => {
            // Create a unique filename: timestamp_random_filename
            const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const storageRef = ref(storage, `${path}/${uniqueName}`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(percentage);
                },
                (err) => {
                    setError(err.message);
                    toast.error(`Upload failed: ${err.message}`);
                    setIsUploading(false);
                    reject(err);
                },
                async () => {
                    try {
                        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        setUrl(downloadUrl);
                        setIsUploading(false);
                        resolve(downloadUrl);
                    } catch (err) {
                        setError(err.message);
                        setIsUploading(false);
                        reject(err);
                    }
                }
            );
        });
    };

    return { progress, error, url, isUploading, uploadFile };
};

export default useStorage;
