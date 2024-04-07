import axios from "axios"
import { Dispatch } from "react"
import { CREATE_BOARD, DELETE_BOARD, GET_BOARDS, PATCH_BOARD } from "../store/actionType"
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
      console.log(res);
      
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


export const patchBoard = (updatedBoardData: any) => async (dispatch: Dispatch) => {
    
  try {        
      const baseurl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.patch(`${baseurl}/boards/${updatedBoardData.id}`, updatedBoardData, {
      }); 
      
      dispatch( {
        type: PATCH_BOARD,
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

export const deleteBoard = (boardId: number) => async (dispatch: Dispatch) => {
    
  try {      
      const baseurl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.delete(`${baseurl}/boards/${boardId}`,{
      }); 
      
      dispatch( {
        type: DELETE_BOARD,
        payload: boardId
    })   
  } 
  catch(e) {
      dispatch( {
        payload: console.log(e),
        type: 'ERROR_OCCURRED'
      })
  }
}
