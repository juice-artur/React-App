import axios from "axios"
import { Dispatch } from "react"
import { GET_BOARDS } from "../store/actionType"

export const getAllBoards = () => async (dispatch: Dispatch) => {
    
  try{    
      const baseurl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.get(`${baseurl}/boards`)      
      dispatch( {
          type: GET_BOARDS,
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