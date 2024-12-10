import React, { useState } from 'react';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    publicationDate: '',
    coverImage: '', // Option for image URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are provided
    if (!bookData.title || !bookData.author || !bookData.description || !bookData.publicationDate || !bookData.coverImage) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:7000/books', {
        method: 'POST',
        body: JSON.stringify(bookData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      const addedBook = await response.json(); // Assuming the server returns the added book

      alert('Book added successfully!');

      // Clear form after successful submission
      setBookData({
        title: '',
        author: '',
        description: '',
        publicationDate: '',
        coverImage: '',
      });
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book');
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={bookData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={bookData.author}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={bookData.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="publicationDate"
          value={bookData.publicationDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL"
          value={bookData.coverImage}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
