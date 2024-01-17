import axios from 'axios';

const API_URL = 'http://localhost:5000/contacts'; // Replace with your API URL

export async function getAllContacts() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

export async function addContact(contactData) {
  try {
    const response = await axios.post(API_URL, contactData);
    return response.data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
}

export async function updateContact(id, contactData) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, contactData);
    return response.data;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
}

export async function deleteContact(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
}
