import { Task } from "../types/Task";
import { ADD_TASK, DELETE_TASK, GET_TASKS, PATCH_TASK } from "./actionType";

export interface TaskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: true
};

const taskReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false

      }
      case PATCH_TASK:
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          const updatedTasks = [...state.tasks];
          updatedTasks[index] = action.payload;
  
          return {
            ...state,
            tasks: [...updatedTasks],
            loading: false
          };
        } else {
          return state;
        }
  

    default:
      return state;
  }
};

export default taskReducer;