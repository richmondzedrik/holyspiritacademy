/**
 * Image utility functions for resizing and compressing images
 */

/**
 * Resize an image file to specified dimensions
 * @param {File} file - The image file to resize
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} maxHeight - Maximum height in pixels
 * @returns {Promise<File>} Resized image file
 */
export const resizeImage = (file, maxWidth = 400, maxHeight = 400) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                // Calculate new dimensions while maintaining aspect ratio
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }

                // Create canvas and draw resized image
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert canvas to blob
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            // Create new file from blob
                            const resizedFile = new File([blob], file.name, {
                                type: file.type,
                                lastModified: Date.now(),
                            });
                            resolve(resizedFile);
                        } else {
                            reject(new Error('Failed to create blob from canvas'));
                        }
                    },
                    file.type,
                    0.85 // Quality (0-1), 0.85 provides good balance
                );
            };

            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };

            img.src = e.target.result;
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
};

/**
 * Compress an image file
 * @param {File} file - The image file to compress
 * @param {number} quality - Compression quality (0-1)
 * @returns {Promise<File>} Compressed image file
 */
export const compressImage = (file, quality = 0.85) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const compressedFile = new File([blob], file.name, {
                                type: file.type,
                                lastModified: Date.now(),
                            });
                            resolve(compressedFile);
                        } else {
                            reject(new Error('Failed to compress image'));
                        }
                    },
                    file.type,
                    quality
                );
            };

            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };

            img.src = e.target.result;
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
};

/**
 * Optimize image by resizing and compressing
 * @param {File} file - The image file to optimize
 * @param {Object} options - Optimization options
 * @returns {Promise<File>} Optimized image file
 */
export const optimizeImage = async (file, options = {}) => {
    const {
        maxWidth = 400,
        maxHeight = 400,
        quality = 0.85
    } = options;

    try {
        // Resize the image
        const resizedFile = await resizeImage(file, maxWidth, maxHeight);

        // Return the resized file (compression is already applied in resize)
        return resizedFile;
    } catch (error) {
        console.error('Error optimizing image:', error);
        throw error;
    }
};

/**
 * Get image dimensions
 * @param {File} file - The image file
 * @returns {Promise<{width: number, height: number}>} Image dimensions
 */
export const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                resolve({
                    width: img.width,
                    height: img.height
                });
            };

            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };

            img.src = e.target.result;
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
};
