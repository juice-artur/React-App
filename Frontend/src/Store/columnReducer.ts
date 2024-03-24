import { ColumnData } from "../types/ColumnData";
import { GET_COLUMNS, PATCH_COLUMN } from "./actionType";


export interface ColumState {
  columns: ColumnData[];
  loading: boolean;
}

const initialState: ColumState = {
  columns:  [],
  loading: false,
};

const columnReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case GET_COLUMNS:
      return {
        ...state,
        columns: action.payload,
        loading: false

      }
    case PATCH_COLUMN:
      return {
        ...state,
        columns: [...action.payload]
      };
    default:
      return state;
  }
};

export default columnReducer;