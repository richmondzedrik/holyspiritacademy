import { collection, getDocs, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Collection reference
const usersCollection = collection(db, 'users');

// Get all users
export const getUsers = async () => {
  try {
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching users: ", error);
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

// Delete user (Note: This only deletes from Firestore, deleting from Auth requires Cloud Functions or Admin SDK)
export const deleteUser = async (userId) => {
  try {
    const userDoc = doc(db, 'users', userId);
    await deleteDoc(userDoc);
    // Note: In a real production app, you'd also want to trigger an Auth deletion
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
};
