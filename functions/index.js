/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onDocumentDeleted} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

// Initialize Firebase Admin
admin.initializeApp();

/**
 * Cloud Function that triggers when a user document is deleted from Firestore.
 * This function automatically deletes the corresponding Firebase Authentication account.
 */
exports.deleteAuthUserOnProfileDelete = onDocumentDeleted(
    "users/{userId}",
    async (event) => {
      const userId = event.params.userId;

      try {
        // Delete the user from Firebase Authentication
        await admin.auth().deleteUser(userId);
        console.log(`Successfully deleted auth user: ${userId}`);
      } catch (error) {
        // If the user doesn't exist in Auth, that's okay
        if (error.code === "auth/user-not-found") {
          console.log(`Auth user ${userId} not found, already deleted`);
        } else {
          console.error(`Error deleting auth user ${userId}:`, error);
          throw error;
        }
      }
    },
);
