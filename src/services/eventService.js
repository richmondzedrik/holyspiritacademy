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
const eventsCollection = collection(db, COLLECTIONS.EVENTS);

// Create a new event
export const addEvent = async (title, date, time, location, category, description = "", imageUrl = null) => {
    try {
        await addDoc(eventsCollection, {
            title,
            date,
            time,
            location,
            category,
            description,
            imageUrl,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        handleApiError(error, 'Failed to create event');
    }
};

// Get all events
export const getEvents = async () => {
    try {
        const q = query(eventsCollection, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        const events = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return events;
    } catch (error) {
        handleApiError(error, 'Failed to fetch events');
    }
};

// Get a single event by ID
export const getEvent = async (id) => {
    try {
        const eventDoc = doc(db, COLLECTIONS.EVENTS, id);
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
        handleApiError(error, 'Failed to fetch event details');
    }
};

// Delete an event
export const deleteEvent = async (id) => {
    try {
        const eventDoc = doc(db, COLLECTIONS.EVENTS, id);
        await deleteDoc(eventDoc);
    } catch (error) {
        handleApiError(error, 'Failed to delete event');
    }
};

// Update an event
export const updateEvent = async (id, data) => {
    try {
        const eventDoc = doc(db, COLLECTIONS.EVENTS, id);
        await updateDoc(eventDoc, {
            ...data,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        handleApiError(error, 'Failed to update event');
    }
};
