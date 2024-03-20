import { PATCH_COLUMN } from "../Store/actionType";


export const patchTask = (task: any) => ({
  type: PATCH_COLUMN,
  payload: task 
})
