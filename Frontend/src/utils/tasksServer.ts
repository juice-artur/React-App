import { GET_TASKS } from '../Store/actionType';
import axios from 'axios'
import { Dispatch } from 'redux';

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
