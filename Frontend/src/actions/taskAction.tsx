import { ADD_TASK, DELETE_TASK, PATCH_TASK, PATCH_TASKS } from "../Store/actionType";
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


export const patchTask = (task: Task) => ({
  type: PATCH_TASK,
  payload: task 
})


export const patchTasks = (tasks: Task[]) => ({
  type: PATCH_TASKS,
  payload: {tasks} 
})

