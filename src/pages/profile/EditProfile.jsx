import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', { name, username, bio, gender });
  };
  const handleCancel = () => {
    // Handle cancel button click here
    console.log('Form canceled');
  };

  return (
    <div className="container">
      <div className="profile-picture">
        <img src="/free-images.jpg" alt="Profile" />
      </div>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-header">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button" >
              Done
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
           />
             />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />