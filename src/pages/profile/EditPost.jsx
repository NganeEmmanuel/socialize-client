import React, { useState } from 'react';
import './editpost.css';

const EditPost = ({ post, onSave }) => {
  const [caption, setCaption] = useState(post?.caption);
  const [music, setMusic] = useState(post?.music);
  const [privacy, setPrivacy] = useState('');


  const handleSave = () => {
    onSave({ caption, music });
  };

  return (
    <div className="edit-post-container">
      <div className="edit-post-header">
        <div className="header-left">
          <button className="back-button">
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
        <div className="header-right">
          <button className="save-button" onClick={handleSave}>
            Post
          </button>
          </div>
      </div>
      <div className="edit-post-content">
        <div className="post-preview">
          <video className="post-video" controls>
            <source src={post?.videoUrl} type="video/mp4" />
          </video>
        </div>