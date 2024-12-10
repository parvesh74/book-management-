import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken, closeModal }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError('');

    try {
      // Make an API call to your backend running on localhost:7000
      const response = await axios.post('http://localhost:7000/login', {
        username,
        password,
      });

      // If the response is successful, set the token and close the modal
      if (response.status === 200) {
        const token = response.data.token || 'mockToken'; // mockToken if the backend doesn't provide a token
        setToken(token); // Set the token in the parent component
        closeModal(); // Close the login modal
        localStorage.setItem('token', token); // Optionally store the token in localStorage
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    }
  };

  const handleOutsideClick = (e) => {
    // If the click is outside the modal content, close the modal
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div style={modalStyle} onClick={handleOutsideClick}>
      <div style={modalContentStyle}>
        <span onClick={closeModal} style={closeBtnStyle}>X</span>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

// CSS styles for modal
const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  position: 'relative',
  width: '300px',
};

const closeBtnStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '20px',
  cursor: 'pointer',
};

export default Login;
