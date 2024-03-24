import { ColumnData } from "../types/ColumnData";
import { PATCH_COLUMN } from "./actionType";


export interface ColumState {
  columns: ColumnData[];
}

const initialState: ColumState = {
  columns: [
     { id: 0, columnPosition:0, title: "First colum"},
     { id: 1,columnPosition:1,  title: "Secomd colum" },

  ]
};

const columnReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case PATCH_COLUMN:
      return {
        ...state,
        columns: [...action.payload.columns]
      };
    default:
      return state;
  }
};

export default columnReducer;