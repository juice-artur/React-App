import { useState } from 'react';
import { CreateTask, Priority } from '../../../types/Task';
import ReactDropdown from '../../dropdown/ReactDropdown';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import Button from '../../Button/Button';


interface CreateTaskModalProps {
  isOpen: boolean,
  onCreateTask: (createdTask: CreateTask) => void;
  onClose: () => void
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onCreateTask, onClose }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskPriority, setTaskPriority] = useState(Priority.LOW);


  const dropdownItems = Object.keys(Priority).map((element) => ({
    title: <div className='flex items-center'>{element}</div>,
    id: element,
  }));


  const handleTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    setTaskDate(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setTaskPriority(e.id);
  };

  const clearForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');
    setTaskPriority(Priority.LOW)
  }

  const handleCreateTask = () => {
    if (taskTitle.trim() !== '') {
      onCreateTask({ title: taskTitle, description: taskDescription, due_date: new Date(taskDate), priority: taskPriority, columnId: 0 });
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
                value={taskTitle}
                onChange={handleTitleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                placeholder="Enter task title"
              />

              <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
              <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={handleDescriptionChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                placeholder="Enter task description"
                rows="5"
              ></textarea>


              <ReactDropdown options={dropdownItems} onSelect={(item: any) => handleDropdownChange(item)} >
                <div className='flex items-center pl-0'>
                  {taskPriority} <BiDotsVerticalRounded />
                </div>
              </ReactDropdown>


              <label htmlFor="taskDate" className="block text-sm font-medium text-gray-700 mb-1">Task due date</label>
              <input
                type="date"
                id="taskDate"
                value={taskDate}
                onChange={handleDateChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                placeholder="Select date"
              />

              <div className="flex justify-end">
                <Button
                  classNames={['mr-2']}
                  variant="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCreateTask();
                  }}
                >
                  Create
                </Button>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                    clearForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
