import { ADD_TASK, DELETE_TASK } from "../Store/actionType";


const addTask = () => {
  return {
    type: ADD_TASK,
  };
};

const deleteTask = () => {
  return {
    type: DELETE_TASK,
  };
};

export { addTask, deleteTask };