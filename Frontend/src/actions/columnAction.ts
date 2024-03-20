import { PATCH_COLUMN } from "../Store/actionType";
import { ColumnData } from "../types/ColumnData";


export const patchColumn = (columns: ColumnData[]) => ({
  type: PATCH_COLUMN,
  payload: { columns }
});
