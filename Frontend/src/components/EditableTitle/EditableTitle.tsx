import React, { useState } from 'react';

const EditableTitle = ({ initialTitle, onSave, isOpen }) => {
  const [isEditing, setIsEditing] = useState(isOpen);
  const [editedTitle, setEditedTitle] = useState(initialTitle);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleTitleSave = () => {
    setIsEditing(false);
    onSave(editedTitle);
  };

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleSave}
          autoFocus
          className="text-xl font-bold mb-2 outline-none border-b border-gray-400"
          style={{ width: "100%" }}
        />
      ) : (
        <h3 className="text-xl font-bold mb-2 cursor-pointer" onClick={handleEdit}>
          {editedTitle}
        </h3>
      )}
    </>
  );
};

export default EditableTitle;