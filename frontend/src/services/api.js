import axios from 'axios';

// Base URL for the backend
const API_URL = 'http://localhost:5000'; // Adjust the port if needed

// Login function
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch all books
export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch a book by ID
export const fetchBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add a new book
export const addBook = async (book, token) => {
  try {
    const response = await axios.post(`${API_URL}/books`, book, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an existing book
export const updateBook = async (id, book, token) => {
  try {
    const response = await axios.put(`${API_URL}/books/${id}`, book, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a book
export const deleteBook = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
