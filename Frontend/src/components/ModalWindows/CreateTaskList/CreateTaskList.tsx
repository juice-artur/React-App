import { useState } from 'react';
import { CreateColumnData } from '../../../types/ColumnData';


interface CreateTaskListModalProps {
    isOpen: boolean,
    onCreateList: (createdTask: CreateColumnData) => void;
    onClose: () => void
}

export const CreateTaskListModal: React.FC<CreateTaskListModalProps> = ({ isOpen, onCreateList, onClose }) => {
    const [listTitle, setListTitle] = useState('');

    const handleTitleChange = (e) => {
        setListTitle(e.target.value);
    };

    const clearForm = () => {
        setListTitle('');
    }

    const handleCreateList = () => {
        if (listTitle.trim() !== '') {
            onCreateList({ title: listTitle });
            clearForm();
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
                            <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                            <input
                                type="text"
                                id="taskTitle"
                                value={listTitle}
                                onChange={handleTitleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                                placeholder="Enter task title"
                            />

                            <div className="flex justify-end">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCreateList();
                                    }}
                                >
                                    Create
                                </button>
                                <button
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClose();
                                        clearForm();
                                    }}
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
