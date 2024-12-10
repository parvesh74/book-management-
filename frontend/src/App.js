import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Books from './components/Books';
import AddBook from './components/AddBook';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Retrieve token from localStorage
  const [showModal, setShowModal] = useState(false); // State for controlling the modal visibility

  // Login button logic
  const handleLogin = () => {
    setShowModal(true); // Show the login modal
  };

  // Logout button logic
  const handleLogout = () => {
    setToken(null); // Clear the token
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle successful login
  const handleLoginSuccess = (token) => {
    setToken(token); // Set the token in state
    localStorage.setItem('token', token); // Store the token in localStorage
    closeModal(); // Close the login modal on success
  };

  return (
    <div className="App">
      {/* Login/Logout Button */}
      {token ? (
        <button onClick={handleLogout} style={{ position: 'absolute', top: '20px', right: '20px' }}>
          Logout
        </button>
      ) : (
        <button onClick={handleLogin} style={{ position: 'absolute', top: '20px', right: '20px' }}>
          Login
        </button>
      )}

      {/* Navigation Links */}
      <nav>
  <Link to="/">Books</Link> | 
  {token && (
    <>
      <Link to="/add-book">Add Book</Link>
    </>
  )}
</nav>


      {/* Routes */}
      <Routes>
        <Route path="/" element={<Books token={token} />} />
        {token && <Route path="/add-book" element={<AddBook token={token} />} />}
      </Routes>

      {/* Show the Login Modal if not logged in */}
      {showModal && <Login setToken={handleLoginSuccess} closeModal={closeModal} />}
    </div>
  );
}

export default App;
