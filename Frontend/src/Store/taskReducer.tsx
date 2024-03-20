import { Task } from "../types/Task";
import { ADD_TASK, DELETE_TASK, PATCH_TASK } from "./actionType";

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [
     { id: 0, listId: 0 , title: "First task"},
     { id: 1,  listId: 0,  title: "Not cry" },
     { id: 2,  listId: 1,  title: "Todo homework" },
     { id: 3,  listId: 1,  title: "Chating with manager" }
  ]
};

const taskReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case PATCH_TASK:
      console.log(action)
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, listId: action.payload.listId}
            : task
        )
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