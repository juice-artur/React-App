import { ADD_TASK, DELETE_TASK } from "./actionType";

export interface TaskState {
  numOfItems: number;
}

const initialState = {
  numOfItems: 0,
};

const taskReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        numOfItems: state.numOfItems + 1,
      };

    case DELETE_TASK:
      return {
        ...state,
        numOfItems: state.numOfItems - 1,
      };
    default:
      return state;
  }
};

export default taskReducer;