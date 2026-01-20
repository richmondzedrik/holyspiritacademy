import { collection, getDocs, deleteDoc, doc, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { COLLECTIONS } from '../constants/collections';

/**
 * Scans the database for orphaned data (comments/posts belong to non-existent users)
 * and removes them.
 */
export const cleanOrphanedData = async () => {
    try {
        // 1. Fetch all valid User IDs
        const usersSnapshot = await getDocs(collection(db, COLLECTIONS.USERS));
        const validUserIds = new Set(usersSnapshot.docs.map(doc => doc.id));

        console.log(`Found ${validUserIds.size} valid users.`);

        const stats = {
            comments: 0,
            posts: 0,
            messages: 0
        };

        // 2. Clean Comments
        // Note: For large datasets, this should be done with batched writes or pagination.
        // For this scale, a simple fetch-and-filter is acceptable.
        const commentsSnapshot = await getDocs(collection(db, COLLECTIONS.COMMENTS));
        const commentsPromises = commentsSnapshot.docs.map(async (docSnapshot) => {
            const data = docSnapshot.data();
            // Check if userId exists in our valid set
            if (!validUserIds.has(data.userId)) {
                await deleteDoc(docSnapshot.ref);
                stats.comments++;
            }
        });
        await Promise.all(commentsPromises);

        // 3. Clean Posts
        const postsSnapshot = await getDocs(collection(db, COLLECTIONS.POSTS));
        const postsPromises = postsSnapshot.docs.map(async (docSnapshot) => {
            const data = docSnapshot.data();
            // Check authorId for posts
            if (!validUserIds.has(data.authorId)) {
                await deleteDoc(docSnapshot.ref);
                stats.posts++;
            }
        });
        await Promise.all(postsPromises);

        // 4. Clean Messages (Optional, if linked to users)
        const messagesSnapshot = await getDocs(collection(db, COLLECTIONS.MESSAGES));
        const messagesPromises = messagesSnapshot.docs.map(async (docSnapshot) => {
            const data = docSnapshot.data();
            // Only delete if it HAS a userId AND that userId is invalid
            // (Guest messages effectively have null userId, so we keep them)
            if (data.userId && !validUserIds.has(data.userId)) {
                await deleteDoc(docSnapshot.ref);
                stats.messages++;
            }
        });
        await Promise.all(messagesPromises);

        return stats;

    } catch (error) {
        console.error("Error cleaning orphaned data:", error);
        throw error;
    }
};
