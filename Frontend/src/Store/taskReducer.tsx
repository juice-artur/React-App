import { Task } from "../types/Task";
import { ADD_TASK, DELETE_TASK, GET_TASKS, PATCH_TASK, PATCH_TASKS } from "./actionType";

export interface TaskState {
  tasks: Task[]; 
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading:true
};

const taskReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case GET_TASKS:
      return {
          ...state,
          tasks:action.payload,
          loading:false

      }

    default:
      return state;
  }
};

export default taskReducer;