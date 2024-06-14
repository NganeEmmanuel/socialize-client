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

