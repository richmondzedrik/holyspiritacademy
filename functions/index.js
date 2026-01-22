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
 * NOTE: Server-side name validation using beforeUserCreated trigger requires
 * Google Cloud Identity Platform (GCIP) to be enabled. Since this project
 * doesn't have GCIP enabled, we rely on robust client-side validation in
 * the signup form (src/utils/nameValidation.js and src/pages/Signup.jsx).
 *
 * The client-side validation is comprehensive and blocks 70+ restricted terms
 * including variations with spaces, special characters, and case differences.
 */

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
