import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';
import { optimizeImage } from '../utils/imageUtils';

/**
 * Upload a profile image to Firebase Storage
 * @param {string} userId - The user's ID
 * @param {File} file - The image file to upload
 * @param {string} oldPhotoURL - The old photo URL to delete (optional)
 * @returns {Promise<string>} The download URL of the uploaded image
 */
export const uploadProfileImage = async (userId, file, oldPhotoURL = null) => {
    try {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            throw new Error('Invalid file type. Please upload a JPG, PNG, GIF, or WebP image.');
        }

        // Validate file size (max 5MB before optimization)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            throw new Error('File size exceeds 5MB. Please upload a smaller image.');
        }

        // Optimize image (resize to 400x400 and compress)
        console.log('Original file size:', (file.size / 1024).toFixed(2), 'KB');
        const optimizedFile = await optimizeImage(file, {
            maxWidth: 400,
            maxHeight: 400,
            quality: 0.85
        });
        console.log('Optimized file size:', (optimizedFile.size / 1024).toFixed(2), 'KB');

        // Delete old image if exists
        if (oldPhotoURL) {
            await deleteProfileImage(oldPhotoURL);
        }

        // Create a unique filename with timestamp
        const timestamp = Date.now();
        const filename = `${timestamp}_${file.name}`;
        const storageRef = ref(storage, `profile-images/${userId}/${filename}`);

        // Upload the optimized file
        const snapshot = await uploadBytes(storageRef, optimizedFile);

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error('Error uploading profile image:', error);
        throw error;
    }
};

/**
 * Delete a profile image from Firebase Storage
 * @param {string} imageUrl - The URL of the image to delete
 */
export const deleteProfileImage = async (imageUrl) => {
    try {
        if (!imageUrl || !imageUrl.includes('firebase')) {
            return; // Not a Firebase Storage URL, skip deletion
        }

        // Extract the path from the URL
        const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/';
        if (!imageUrl.startsWith(baseUrl)) {
            return;
        }

        // Parse the storage path from the URL
        const pathStart = imageUrl.indexOf('/o/') + 3;
        const pathEnd = imageUrl.indexOf('?');
        const encodedPath = imageUrl.substring(pathStart, pathEnd);
        const path = decodeURIComponent(encodedPath);

        const imageRef = ref(storage, path);
        await deleteObject(imageRef);
    } catch (error) {
        console.error('Error deleting profile image:', error);
        // Don't throw error - deletion failure shouldn't block other operations
    }
};
