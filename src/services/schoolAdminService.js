import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/config';
import { administrators as initialData } from '../data/administrators';

const COLLECTION_NAME = 'school_administrators';

// Fetch all administrator categories
export const getSchoolAdministrators = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

        // If empty, seed with initial data
        if (querySnapshot.empty) {
            console.log("No administrators found in DB. Seeding initial data...");
            await seedDatabase();
            // Fetch again after seeding
            const newSnapshot = await getDocs(collection(db, COLLECTION_NAME));
            return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => a.order - b.order);
        }

        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data.sort((a, b) => a.order - b.order);
    } catch (error) {
        console.error("Error fetching school administrators:", error);
        throw error;
    }
};

// Seed database with local data
const seedDatabase = async () => {
    const batchPromises = initialData.map((category, index) => {
        // Create a stable ID based on title or random
        // Using simple IDs for known categories to make them easier to manage if needed
        let docId = category.title.toLowerCase().replace(/[^a-z0-9]/g, '_');

        return setDoc(doc(db, COLLECTION_NAME, docId), {
            title: category.title,
            members: category.members,
            order: index
        });
    });

    await Promise.all(batchPromises);
};

// Add a new member to a category
export const addAdministratorMember = async (categoryId, member) => {
    try {
        const categoryRef = doc(db, COLLECTION_NAME, categoryId);
        // Create a new member object with a unique ID
        const newMember = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            ...member
        };
        await updateDoc(categoryRef, {
            members: arrayUnion(newMember)
        });
        return newMember;
    } catch (error) {
        console.error("Error adding administrator:", error);
        throw error;
    }
};

// Update an existing member
export const updateAdministratorMember = async (categoryId, updatedMember, allMembers) => {
    try {
        const categoryRef = doc(db, COLLECTION_NAME, categoryId);

        // Firestore array manipulation is tricky for updates (need to remove old and add new, or replace whole array)
        // Replacing the whole array is safer for updates to ensure index integrity
        const updatedMembers = allMembers.map(m => m.id === updatedMember.id ? updatedMember : m);

        await updateDoc(categoryRef, {
            members: updatedMembers
        });
    } catch (error) {
        console.error("Error updating administrator:", error);
        throw error;
    }
};

// Delete a member
export const deleteAdministratorMember = async (categoryId, memberId, allMembers) => {
    try {
        const categoryRef = doc(db, COLLECTION_NAME, categoryId);
        const updatedMembers = allMembers.filter(m => m.id !== memberId);

        await updateDoc(categoryRef, {
            members: updatedMembers
        });
    } catch (error) {
        console.error("Error deleting administrator:", error);
        throw error;
    }
};

// Update entire category (e.g. title)
export const updateCategory = async (categoryId, data) => {
    try {
        const categoryRef = doc(db, COLLECTION_NAME, categoryId);
        await updateDoc(categoryRef, data);
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};
