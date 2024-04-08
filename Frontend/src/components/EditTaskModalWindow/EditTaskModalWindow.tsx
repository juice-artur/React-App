import React, { useEffect, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Priority, Task } from '../../types/Task';
import ReactDropdown from '../dropdown/ReactDropdown';
import moment from 'moment';
import { HistoryOfChangesTask } from '../../types/TaskHistory';
import axios from 'axios';

interface EditTaskModalProps {
  isOpen: boolean,
  onEditTask: (editedTask: Task) => void;
  onClose: () => void;
  task: Task;
}

export const EditTaskModalWindow: React.FC<EditTaskModalProps> = ({ task, isOpen, onEditTask, onClose }) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskDate, setTaskDate] = useState(moment(task.due_date).format("YYYY-MM-DD"));
  const [taskPriority, setTaskPriority] = useState(task.priority);
  const [history, setHistory] = useState<HistoryOfChangesTask[]>([]);

  const dropdownItems = Object.keys(Priority).map((element) => ({
    title: <div className='flex items-center'>{element}</div>,
    id: element,
  }));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    setTaskDate(e.target.value);
  };

  const handleDropdownChange = (item: any) => {
    setTaskPriority(item.id);
  };

  const clearForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');
    setTaskPriority(Priority.LOW);
  };

  const handleEditTask = () => {
    if (taskTitle.trim() !== '') {
      const editedTask: Task = {
        ...task,
        title: taskTitle,
        description: taskDescription,
        due_date: new Date(taskDate),
        priority: taskPriority,
      };
      onEditTask(editedTask);
      onClose();
    }
  };
  

  const fetchData = async (id: number) => {
    try {
      const baseurl = import.meta.env.VITE_API_BASE_URL
  
      const response = await axios.get(`${baseurl}/history-of-changes-task/${id}`);
  
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData(task.id);
    }
  }, [isOpen, task.id]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto flex justify-center items-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg shadow-md flex w-full max-w-screen-lg">
            <div className="p-6 w-2/3">
              <h2 className="text-lg font-semibold mb-4">Update Task</h2>
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
                rows={5}
              ></textarea>

              <ReactDropdown options={dropdownItems} onSelect={handleDropdownChange} classNames={['mb-4']}>
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
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTask();
                  }}
                >
                  Update
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
            
            <div className="w-1/3 p-6 bg-gray-100">
              <h3 className="text-lg font-semibold mb-2">History of Changes</h3>
              <ul className="list-disc pl-5">
                {history.map((change, index) => (
                  <li key={index}>{change.description}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
