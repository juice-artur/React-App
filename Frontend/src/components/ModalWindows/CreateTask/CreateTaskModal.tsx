import React, { useState } from 'react';

export const CreateTaskModal = ({ isOpen, onClose, onCreateTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleCreateTask = () => {
    if (taskTitle.trim() !== '') {
      onCreateTask(taskTitle);
      setTaskTitle('');
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto flex justify-center items-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg shadow-md w-96">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Create Task</h2>
              <input
                type="text"
                value={taskTitle}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                placeholder="Enter task title"
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                  onClick={handleCreateTask}
                >
                  Create
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
