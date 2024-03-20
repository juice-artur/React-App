import { Task } from "../types/Task";
import { ADD_TASK, DELETE_TASK } from "./actionType";

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [
     { id: 0, createdAt: new Date(), listId: 0 },
     { id: 1, createdAt: new Date(), listId: 0 },
     { id: 2, createdAt: new Date(), listId: 1 },
     { id: 3, createdAt: new Date(), listId: 1 }
  ]
};

const taskReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: state.tasks.length, createdAt: new Date(), listId: 0 }
        ]
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    default:
      return state;
  }
};

export default taskReducer;