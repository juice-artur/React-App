import { Task } from "../types/Task";
import { ADD_TASK, DELETE_TASK, PATCH_TASK, PATCH_TASKS } from "./actionType";

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [
     { id: 0, position:0, description:"one", created_at: new Date(), updated_at: new Date(),  listId: 0 , title: "First task"},
     { id: 1, position:1, description:"one", created_at: new Date(), updated_at: new Date(),  listId: 0,  title: "Not cry" },
     { id: 4, position:2, description:"one", created_at: new Date(), updated_at: new Date(),  listId: 0 , title: "Another task"},
     { id: 2, position:0, description:"one", created_at: new Date(), updated_at: new Date(),  listId: 1,  title: "Todo homework" },
     { id: 3, position:1, description:"one", created_at: new Date(), updated_at: new Date(),  listId: 1,  title: "Chating with manager" }
  ]
};

const taskReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case PATCH_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, listId: action.payload.listId}
            : task
        )
      };

      case PATCH_TASKS:
      return {
        ...state,
        tasks: [...action.payload.tasks]
      };

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