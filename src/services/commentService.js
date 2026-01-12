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

const commentsCollection = collection(db, 'comments');

// Add a new comment (pending approval)
export const addComment = async (postId, userId, userName, userPhoto, content) => {
  try {
    await addDoc(commentsCollection, {
      postId,
      userId,
      userName,
      userPhoto,
      content,
      isApproved: false, // Default to pending
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error adding comment: ", error);
    throw error;
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
    console.error("Error fetching comments: ", error);
    throw error;
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
    console.error("Error fetching all comments: ", error);
    throw error;
  }
};

// Approve a comment
export const approveComment = async (commentId) => {
  try {
    const commentRef = doc(db, 'comments', commentId);
    await updateDoc(commentRef, {
      isApproved: true
    });
  } catch (error) {
    console.error("Error approving comment: ", error);
    throw error;
  }
};

// Delete/Decline a comment
export const deleteComment = async (commentId) => {
  try {
    const commentRef = doc(db, 'comments', commentId);
    await deleteDoc(commentRef);
  } catch (error) {
    console.error("Error deleting comment: ", error);
    throw error;
  }
};
