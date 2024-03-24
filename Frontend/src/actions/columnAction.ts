import { PATCH_COLUMN } from "../Store/actionType";
import { ColumnData } from "../types/ColumnData";


export const patchColumn = (column: ColumnData) => ({
  type: PATCH_COLUMN,
  payload: { column }
});
