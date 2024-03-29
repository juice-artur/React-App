import { Task } from "../types/Task";
import { CREATE_TASK, DELETE_TASK, GET_TASKS, PATCH_TASK } from "./actionType";

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
    case CREATE_TASK:
      const updatedTasks = [...state.tasks, action.payload].sort((first: Task, second: Task) => first.position - second.position);

      return {
        ...state,
        tasks: [...updatedTasks],
        loading: false
      };
    case DELETE_TASK:
      const tasksAfterDelete = [...state.tasks]
        .filter((t: Task) => t.id != action.payload)
        .sort((first: Task, second: Task) => first.position - second.position);

      return {
        ...state,
        tasks: [...tasksAfterDelete],
        loading: false
      };

    default:
      return state;
  }
};

export default taskReducer;