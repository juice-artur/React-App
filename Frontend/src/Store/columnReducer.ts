import { ColumnData } from "../types/ColumnData";


export interface ColumState {
  columns: ColumnData[];
}

const initialState: ColumState = {
  columns: [
     { id: 0, title: "First colum"},
     { id: 1,  title: "Secomd colum" },

  ]
};

const columnReducer = (state = initialState, action : any) => {
return state
};

export default columnReducer;