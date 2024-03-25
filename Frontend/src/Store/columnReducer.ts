import { ColumnData } from "../types/ColumnData";
import { CREATE_COLUMN, DELETE_COLUMN, GET_COLUMNS, PATCH_COLUMN } from "./actionType";


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
      const index = state.columns.findIndex(column => column.id === action.payload.id);
      if (index !== -1) {
        const updatedColumns = [...state.columns];
        updatedColumns[index] = action.payload;

        return {
          ...state,
          columns: [...updatedColumns],
          loading: false
        };
      } else {
        return state;
      }

      case CREATE_COLUMN:
        const updatedColumn = [...state.columns, action.payload].sort((first: ColumnData, second: ColumnData) => first.position - second.position);

        return {
          ...state,
          columns: [...updatedColumn],
          loading: false
        };

        case DELETE_COLUMN:
        const columnAfterDelete = [...state.columns]
        .filter((column: ColumnData) => column.id != action.payload)
        .sort((first: ColumnData, second: ColumnData) => first.position - second.position);

        return {
          ...state,
          columns: [...columnAfterDelete],
          loading: false
        };
    default:
      return state;
  }
};

export default columnReducer;