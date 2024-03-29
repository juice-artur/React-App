import axios from 'axios'
import { Dispatch } from 'redux';
import { CREATE_COLUMN, DELETE_COLUMN, GET_COLUMNS, PATCH_COLUMN } from '../Store/actionType';
import { CreateColumnData } from '../types/ColumnData';

export const getAllTaskColumns = () => async (dispatch: Dispatch) => {
    
  try{    
      const baseurl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.get(`${baseurl}/task-columns`)  
      dispatch( {
          type: GET_COLUMNS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
        payload: console.log(e),
        type: 'ERROR_OCCURRED'
      })
  }
}


export const patchColumn = (updatedColumnData: any) => async (dispatch: Dispatch) => {
    
  try {    
      const baseurl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.patch(`${baseurl}/task-columns/${updatedColumnData.id}`, updatedColumnData, {
      });       
      dispatch( {
        type: PATCH_COLUMN,
        payload: res.data
    })   
  } 
  catch(e) {
      dispatch( {
        payload: console.log(e),
        type: 'ERROR_OCCURRED'
      })
  }
}

export const deleteColumn = (deleteColumnId: number) => async (dispatch: Dispatch) => {
    
  try {    
      const baseurl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.delete(`${baseurl}/task-columns/${deleteColumnId}`);       
      dispatch( {
        type: DELETE_COLUMN,
        payload: deleteColumnId
    })   
  } 
  catch(e) {
      dispatch( {
        payload: console.log(e),
        type: 'ERROR_OCCURRED'
      })
  }
}



export const createColumn = (createColumn: CreateColumnData) => async (dispatch: Dispatch) => {
    
  try {    
      const baseurl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.post(`${baseurl}/task-columns`, createColumn, {
      }); 
      
      dispatch( {
        type: CREATE_COLUMN,
        payload: res.data
    })   
  } 
  catch(e) {
      dispatch( {
        payload: console.log(e),
        type: 'ERROR_OCCURRED'
      })
  }
}