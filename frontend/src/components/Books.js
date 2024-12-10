// import React, { useEffect, useState } from 'react';

// const Books = ({ token }) => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editBook, setEditBook] = useState(null); // Store the book being edited
//   const [editFormData, setEditFormData] = useState({
//     title: '',
//     author: '',
//     description: '',
//     coverImage: '',
//     publicationDate: '', // Added publicationDate to form data
//   }); // Store the edited book data

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await fetch('http://localhost:7000/books');
//         const data = await response.json();
//         setBooks(data);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const handleDelete = async (bookId) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    
//     if (confirmDelete) {
//       try {
//         const response = await fetch(`http://localhost:7000/books/${bookId}`, {
//           method: 'DELETE',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to delete book');
//         }

//         // Remove the deleted book from the state
//         setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
//         alert('Book deleted successfully!');
//       } catch (error) {
//         console.error("Error deleting book:", error);
//         alert('Failed to delete book');
//       }
//     }
//   };

//   const handleEdit = (book) => {
//     setEditBook(book);
//     setEditFormData({
//       title: book.title,
//       author: book.author,
//       description: book.description,
//       coverImage: book.coverImage,
//       publicationDate: book.publicationDate, // Set the publication date when editing
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:7000/books/${editBook.id}`, {
//         method: 'PUT',
//         body: JSON.stringify(editFormData),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update book');
//       }

//       const updatedBook = await response.json();
//       setBooks((prevBooks) =>
//         prevBooks.map((book) =>
//           book.id === updatedBook.id ? updatedBook : book
//         )
//       );
//       alert('Book updated successfully!');
//       setEditBook(null); // Close the modal after editing
//     } catch (error) {
//       console.error("Error updating book:", error);
//       alert('Failed to update book');
//     }
//   };

//   if (loading) {
//     return <p>Loading books...</p>;
//   }

//   return (
//     <div>
//       <h1>Books</h1>
//       {books.length === 0 ? (
//         <p>No books available.</p>
//       ) : (
//         <ul>
//           {books.map((book) => (
//             <li key={book.id}>
//               <h3>{book.title}</h3>
//               <p>{book.author}</p>
//               <p>{book.description}</p>
//               <img src={book.coverImage} alt={book.title} style={{ width: '150px' }} />
              
//               {token && (
//                 <>
//                   <button onClick={() => handleEdit(book)}>
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(book.id)}
//                     style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
//                   >
//                     Delete
//                   </button>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Edit Book Modal */}
//       {editBook && (
//         <div style={modalStyles}>
//           <div style={modalContentStyles}>
//             <h2>Edit Book</h2>
//             <form onSubmit={handleEditSubmit}>
//               <label>
//                 Title:
//                 <input
//                   type="text"
//                   name="title"
//                   value={editFormData.title}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//               <br />
//               <label>
//                 Author:
//                 <input
//                   type="text"
//                   name="author"
//                   value={editFormData.author}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//               <br />
//               <label>
//                 Description:
//                 <textarea
//                   name="description"
//                   value={editFormData.description}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//               <br />
//               <label>
//                 Cover Image URL:
//                 <input
//                   type="text"
//                   name="coverImage"
//                   value={editFormData.coverImage}
//                   onChange={handleChange}
//                 />
//               </label>
//               <br />
//               <label>
//                 Publication Date:
//                 <input
//                   type="date"
//                   name="publicationDate"
//                   value={editFormData.publicationDate}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//               <br />
//               <button type="submit">Save Changes</button>
//               <button
//                 type="button"
//                 onClick={() => setEditBook(null)} // Close the modal without saving
//                 style={{ backgroundColor: 'gray', color: 'white', marginLeft: '10px' }}
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const modalStyles = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   zIndex: 1000,
// };

// const modalContentStyles = {
//   backgroundColor: 'white',
//   padding: '20px',
//   borderRadius: '5px',
//   maxWidth: '500px',
//   width: '100%',
// };

// export default Books;


// -----------------------------------


import React, { useEffect, useState } from 'react';

const Books = ({ token }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // To store the filtered books
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [editBook, setEditBook] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    publicationDate: '',
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:7000/books');
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data); // Initially display all books
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on the search term
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter books by title, author, description, or publication date
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.author.toLowerCase().includes(term.toLowerCase()) ||
      book.description.toLowerCase().includes(term.toLowerCase()) ||
      book.publicationDate.includes(term)
    );
    setFilteredBooks(filtered);
  };

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:7000/books/${bookId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete book');
        }

        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        setFilteredBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId)); // Remove from filtered list
        alert('Book deleted successfully!');
      } catch (error) {
        console.error("Error deleting book:", error);
        alert('Failed to delete book');
      }
    }
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setEditFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      coverImage: book.coverImage,
      publicationDate: book.publicationDate,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:7000/books/${editBook.id}`, {
        method: 'PUT',
        body: JSON.stringify(editFormData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      const updatedBook = await response.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        )
      );
      setFilteredBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        )
      );
      alert('Book updated successfully!');
      setEditBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
      alert('Failed to update book');
    }
  };

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <div>
      <h1>Books</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title, author, description, or publication date"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
      />

      {filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.description}</p>
              <p>{book.publicationDate}</p>
              <img src={book.coverImage} alt={book.title} style={{ width: '150px' }} />
              
              {token && (
                <>
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Edit Book Modal */}
      {editBook && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h2>Edit Book</h2>
            <form onSubmit={handleEditSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Author:
                <input
                  type="text"
                  name="author"
                  value={editFormData.author}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Description:
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Cover Image URL:
                <input
                  type="text"
                  name="coverImage"
                  value={editFormData.coverImage}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Publication Date:
                <input
                  type="date"
                  name="publicationDate"
                  value={editFormData.publicationDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <button type="submit">Save Changes</button>
              <button
                type="button"
                onClick={() => setEditBook(null)} // Close the modal without saving
                style={{ backgroundColor: 'gray', color: 'white', marginLeft: '10px' }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  maxWidth: '500px',
  width: '100%',
};

export default Books;
