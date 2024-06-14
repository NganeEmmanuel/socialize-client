import React, { useState } from 'react';

const EditPost = ({ post, onSave, onDelete }) => {
  const [caption, setCaption] = useState(post.caption);
  const [music, setMusic] = useState(post.music);

  const handleSave = () => {
    onSave({ caption, music });
  };

  const handleDelete = () => {
    onDelete(post.id);
  }
}

const onDeletePost = (postId) => {
   
    fetch(`/api/v1/post/delete/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
       
      },
    })
      .then((response) => {
        if (response.ok) {
          
          console.log(`Post with ID ${postId} has been deleted.`);
          
        } else {
         
          console.error(`Error deleting post with ID ${postId}: ${response.status}`);
        }
      })
      .catch((error) => {
        
        console.error('Error deleting post:', error);
      });
  };