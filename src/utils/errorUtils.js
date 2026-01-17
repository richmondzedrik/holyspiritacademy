import toast from 'react-hot-toast';

/**
 * Standardized error handler for API/Service calls.
 * Logs the error to console and optionally displays a user-friendly toast.
 * 
 * @param {Error} error - The error object caught in the try-catch block.
 * @param {string} customMessage - A confusing message to show the user (optional).
 * @param {boolean} showToast - Whether to show a visual toast notification (default: true).
 * @throws {Error} Re-throws the error so the calling component can handle specific logic if needed.
 */
export const handleApiError = (error, customMessage = 'An unexpected error occurred', showToast = true) => {
    // Log full error for debugging
    console.error(`[API Error] ${customMessage}:`, error);

    // Construct a user-friendly message
    let displayMessage = customMessage;

    // Handle specific Firebase error codes if needed
    if (error.code) {
        switch (error.code) {
            case 'permission-denied':
                displayMessage = 'You do not have permission to perform this action.';
                break;
            case 'unavailable':
                displayMessage = 'Network issue. Please check your internet connection.';
                break;
            case 'not-found':
                displayMessage = 'The requested resource was not found.';
                break;
            default:
                // Keep the custom message
                break;
        }
    }

    if (showToast) {
        toast.error(displayMessage);
    }

    // Re-throw to let the UI update its local state (e.g., set loading to false)
    throw error;
};
