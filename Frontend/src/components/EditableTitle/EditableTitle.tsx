import React, { useState, useRef, useEffect } from 'react';

const EditableTitle = ({ initialTitle, onSave, focusInput }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(initialTitle);
  const inputRef = useRef(null);

  useEffect(() => {
    if (focusInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusInput]);

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
      {isEditing || focusInput ? (
        <input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleSave}
          autoFocus
          ref={inputRef}
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