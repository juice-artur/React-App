import axios from "axios"
import { Dispatch } from "react"
import { CREATE_BOARD, GET_BOARDS } from "../store/actionType"
import { Board } from "../types/Board"

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


export const createBoard = (createBoard: Board) => async (dispatch: Dispatch) => {
    
  try {    
      const baseurl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.post(`${baseurl}/boards`, createBoard, {
      }); 
      
      dispatch( {
        type: CREATE_BOARD,
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