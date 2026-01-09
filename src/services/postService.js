import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Collection reference
const postsCollection = collection(db, 'posts');

// Create a new post
export const createPost = async (title, content, imageUrl = null, authorId) => {
  try {
    await addDoc(postsCollection, {
      title,
      content,
      imageUrl,
      authorId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isApproved: true // Admin posts are auto-approved usually, or if users post, false. Assuming Admin posts for now.
    });
  } catch (error) {
    console.error("Error creating post: ", error);
    throw error;
  }
};

// Get all posts (ordered by newest first)
export const getPosts = async () => {
  try {
    const q = query(postsCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
  } catch (error) {
    console.error("Error deleting post: ", error);
    throw error;
  }
};

// Update a post
export const updatePost = async (id, data) => {
  try {
    const postDoc = doc(db, 'posts', id);
    await updateDoc(postDoc, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating post: ", error);
    throw error;
  }
};
