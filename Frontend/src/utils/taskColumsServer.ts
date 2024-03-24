import axios from 'axios'
import { Dispatch } from 'redux';
import { GET_COLUMNS } from '../Store/actionType';

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
