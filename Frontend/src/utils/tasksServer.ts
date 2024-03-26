import { CREATE_TASK, DELETE_TASK, GET_TASKS, PATCH_TASK } from '../Store/actionType';
import axios from 'axios'
import { Dispatch } from 'redux';
import { CreateTask } from '../types/Task';

export const getAllTasks = () => async (dispatch: Dispatch) => {
    
  try{    
      const baseurl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.get(`${baseurl}/tasks`)      
      dispatch( {
          type: GET_TASKS,
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

export const patchTask = (updatedTaskData: any) => async (dispatch: Dispatch) => {
    
  try {    
    console.log(updatedTaskData);
    
      const baseurl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.patch(`${baseurl}/tasks/${updatedTaskData.id}`, updatedTaskData, {
      }); 
      
      dispatch( {
        type: PATCH_TASK,
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

export const createTask = (createTask: CreateTask) => async (dispatch: Dispatch) => {
    
  try {    
      const baseurl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.post(`${baseurl}/tasks`, createTask, {
      }); 
      
      dispatch( {
        type: CREATE_TASK,
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


export const deleteTask = (deleteTaskId: number) => async (dispatch: Dispatch) => {
    
  try {    
      const baseurl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.delete(`${baseurl}/tasks/${deleteTaskId}`); 
      
      dispatch( {
        type: DELETE_TASK,
        payload: deleteTaskId
    })   
  } 
  catch(e) {
      dispatch( {
        payload: console.log(e),
        type: 'ERROR_OCCURRED'
      })
  }
}


