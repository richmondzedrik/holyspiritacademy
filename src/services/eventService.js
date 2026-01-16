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
const eventsCollection = collection(db, 'events');

// Create a new event
export const addEvent = async (title, date, time, location, category, description = "") => {
    try {
        await addDoc(eventsCollection, {
            title,
            date, // Storing as string or timestamp? Based on UI it looks like string "Feb 14, 2026" but for sorting, Timestamp is better. 
            // However, looking at the UI mock data, it was "Feb 14, 2026". 
            // To allow proper sorting, we should probably store a date object too. 
            // ex: dateString: "Feb 14, 2026", dateIso: "2026-02-14"
            time,
            location,
            category,
            description,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error creating event: ", error);
        throw error;
    }
};

// Get all events
export const getEvents = async () => {
    try {
        // Determine sort order. Ideally we sort by date. 
        // Since we're just starting, let's just get them and sort valid dates in client or here if we store comparable dates.
        // For now, order by createdAt desc just to see latest added.
        const q = query(eventsCollection, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        // We can do some client-side sorting here if needed to put nearest upcoming events first
        const events = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return events;
    } catch (error) {
        console.error("Error fetching events: ", error);
        throw error;
    }
};

// Get a single event by ID
export const getEvent = async (id) => {
    try {
        const eventDoc = doc(db, 'events', id);
        const eventSnapshot = await getDoc(eventDoc);

        if (eventSnapshot.exists()) {
            return {
                id: eventSnapshot.id,
                ...eventSnapshot.data()
            };
        } else {
            throw new Error('Event not found');
        }
    } catch (error) {
        console.error("Error fetching event: ", error);
        throw error;
    }
};

// Delete an event
export const deleteEvent = async (id) => {
    try {
        const eventDoc = doc(db, 'events', id);
        await deleteDoc(eventDoc);
    } catch (error) {
        console.error("Error deleting event: ", error);
        throw error;
    }
};

// Update an event
export const updateEvent = async (id, data) => {
    try {
        const eventDoc = doc(db, 'events', id);
        await updateDoc(eventDoc, {
            ...data,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating event: ", error);
        throw error;
    }
};
