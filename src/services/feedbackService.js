import { collection, addDoc, getDocs, orderBy, query, serverTimestamp, where, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const messagesCollection = collection(db, 'messages');

// Send a new message (feedback)
export const sendMessage = async (name, email, subject, message, userId = null) => {
  try {
    await addDoc(messagesCollection, {
      name,
      email,
      subject,
      message,
      userId,
      createdAt: serverTimestamp(),
      isRead: false
    });
  } catch (error) {
    console.error("Error sending message: ", error);
    throw error;
  }
};

// Get all messages (for Admin)
export const getMessages = async () => {
  try {
    const q = query(messagesCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching messages: ", error);
    throw error;
  }
};

// Delete all messages by a specific user
export const deleteUserMessages = async (userId) => {
  try {
    const q = query(messagesCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting user messages: ", error);
    throw error;
  }
};
