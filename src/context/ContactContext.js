import { writable } from 'svelte/store';
import { getAllContacts, addContact, updateContact, deleteContact } from '../services/api';

export const contacts = writable([]);
export const currentContact = writable(null);

export const fetchContacts = async () => {
    try {
        const fetchedContacts = await getAllContacts();
        contacts.set(fetchedContacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
};

export const handleAddContact = async (contactData) => {
    try {
        const newContact = await addContact(contactData);
        fetchContacts(); // Refresh the contact list
        return newContact;
    } catch (error) {
        console.error('Error adding contact:', error);
    }
};

export const handleUpdateContact = async (id, contactData) => {
    try {
        const updatedContact = await updateContact(id, contactData);
        fetchContacts(); // Refresh the contact list
        return updatedContact;
    } catch (error) {
        console.error('Error updating contact:', error);
    }
};

export const handleDeleteContact = async (id) => {
    try {
        await deleteContact(id);
        fetchContacts(); // Refresh the contact list
    } catch (error) {
        console.error('Error deleting contact:', error);
    }
};

export const handleSetCurrentContact = (contact) => {
    currentContact.set(contact);
};
