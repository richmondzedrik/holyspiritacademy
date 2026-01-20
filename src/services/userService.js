import { collection, getDocs, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { deleteUserComments } from './commentService';
import { deleteUserMessages } from './feedbackService';
import { deleteUserPosts } from './postService';



// Collection reference
const usersCollection = collection(db, 'users');

// Get all users from Firestore
// Note: This fetches user profile data from Firestore, not directly from Firebase Auth
// Users are stored in Firestore when they register, with their Auth UID as the document ID
export const getUsers = async () => {
  try {
    console.log("Fetching users from Firestore...");
    const snapshot = await getDocs(usersCollection);

    if (snapshot.empty) {
      console.warn("No users found in Firestore 'users' collection");
      return [];
    }

    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`Successfully fetched ${users.length} users from Firestore`);
    return users;
  } catch (error) {
    console.error("Error fetching users from Firestore:", error);
    console.error("Error details:", {
      code: error.code,
      message: error.message,
      name: error.name
    });
    throw error;
  }
};

// Get single user data
export const getUserData = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, data) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, data);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Update user role (e.g., promote to admin)
export const updateUserRole = async (userId, newRole) => {
  try {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, {
      role: newRole
    });
  } catch (error) {
    console.error("Error updating user role: ", error);
    throw error;
  }
};

// Delete user (Firestore deletion triggers Cloud Function to delete from Auth)
export const deleteUser = async (userId) => {
  try {
    // Delete related data first
    await Promise.all([
      deleteUserComments(userId),
      deleteUserMessages(userId),
      deleteUserPosts(userId)
    ]);

    const userDoc = doc(db, 'users', userId);
    await deleteDoc(userDoc);
    // Note: Deleting the Firestore document triggers the Cloud Function 
    // 'deleteAuthUserOnProfileDelete' which automatically deletes the user from Firebase Auth
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
};
