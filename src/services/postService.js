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
import { COLLECTIONS } from '../constants/collections';
import { handleApiError } from '../utils/errorUtils';

// Collection reference
const postsCollection = collection(db, COLLECTIONS.POSTS);

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
      isApproved: true // Admin posts are auto-approved usually
    });
  } catch (error) {
    handleApiError(error, 'Failed to create post');
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
    handleApiError(error, 'Failed to fetch posts');
  }
};

// Get a single post by ID
export const getPost = async (id) => {
  try {
    const postDoc = doc(db, COLLECTIONS.POSTS, id);
    const postSnapshot = await getDoc(postDoc);

    if (postSnapshot.exists()) {
      return {
        id: postSnapshot.id,
        ...postSnapshot.data()
      };
    } else {
      throw new Error('Post not found');
    }
  } catch (error) {
    handleApiError(error, 'Failed to fetch post details');
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    const postDoc = doc(db, COLLECTIONS.POSTS, id);
    await deleteDoc(postDoc);
  } catch (error) {
    handleApiError(error, 'Failed to delete post');
  }
};

// Update a post
export const updatePost = async (id, data) => {
  try {
    const postDoc = doc(db, COLLECTIONS.POSTS, id);
    await updateDoc(postDoc, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleApiError(error, 'Failed to update post');
  }
};
