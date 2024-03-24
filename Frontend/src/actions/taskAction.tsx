import { ADD_TASK, DELETE_TASK, PATCH_TASK } from "../Store/actionType";
import { Task } from "../types/Task";


export const addTask = () => {
  return {
    type: ADD_TASK,
  };
};

export const deleteTask = () => {
  return {
    type: DELETE_TASK,
  };
};




