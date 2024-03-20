import { Task } from "../types/Task";
import { ADD_TASK, DELETE_TASK } from "./actionType";

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [
     { id: 0, createdAt: new Date(), listId: 0 , title: "First task"},
     { id: 1, createdAt: new Date(), listId: 0,  title: "Not cry" },
     { id: 2, createdAt: new Date(), listId: 1,  title: "Todo homework" },
     { id: 3, createdAt: new Date(), listId: 1,  title: "Chating with manager" }
  ]
};

const taskReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: state.tasks.length, createdAt: new Date(), listId: 0, title: "new Date()" }
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