import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { COLLECTIONS } from '../constants/collections';
import { handleApiError } from '../utils/errorUtils';

const commentsCollection = collection(db, COLLECTIONS.COMMENTS);

// Add a new comment (pending approval)
export const addComment = async (postId, userId, userName, userPhotoURL, content) => {
  try {
    await addDoc(commentsCollection, {
      postId,
      userId,
      userName,
      userPhotoURL,
      content,
      isApproved: false, // Default to pending
      createdAt: serverTimestamp()
    });
  } catch (error) {
    handleApiError(error, 'Failed to add comment');
  }
};


// Get approved comments for a specific post
export const getCommentsByPost = async (postId) => {
  try {
    // Query only by postId to avoid needing a composite index
    // We'll filter isApproved and sort client-side
    const q = query(
      commentsCollection,
      where("postId", "==", postId)
    );
    const snapshot = await getDocs(q);

    // Filter approved comments, map results, and sort by createdAt
    const comments = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(comment => comment.isApproved === true)
      .sort((a, b) => {
        // Sort by createdAt (ascending - oldest first)
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return aTime - bTime;
      });

    return comments;
  } catch (error) {
    handleApiError(error, 'Failed to fetch comments');
  }
};

// Get ALL comments (for Admin moderation)
export const getAllComments = async () => {
  try {
    const q = query(commentsCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    handleApiError(error, 'Failed to fetch all comments');
  }
};

// Approve a comment
export const approveComment = async (commentId) => {
  try {
    const commentRef = doc(db, COLLECTIONS.COMMENTS, commentId);
    await updateDoc(commentRef, {
      isApproved: true
    });
  } catch (error) {
    handleApiError(error, 'Failed to approve comment');
  }
};

// Delete/Decline a comment
export const deleteComment = async (commentId) => {
  try {
    const commentRef = doc(db, COLLECTIONS.COMMENTS, commentId);
    await deleteDoc(commentRef);
  } catch (error) {
    handleApiError(error, 'Failed to delete comment');
  }
};

// Delete all comments by a specific user
export const deleteUserComments = async (userId) => {
  try {
    const q = query(commentsCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    handleApiError(error, 'Failed to delete user comments');
  }
};
