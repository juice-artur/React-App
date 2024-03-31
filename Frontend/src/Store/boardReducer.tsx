import { Board } from "../types/Board";
import { CREATE_BOARD, DELETE_BOARD, GET_BOARDS, PATCH_BOARD } from "./actionType";

export interface BoardState {
    boards: Board[];
    loading: boolean;
}

const initialState: BoardState = {
    boards: [],
    loading: true
};

const boardReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_BOARDS:
            return {
                ...state,
                boards: action.payload,
                loading: false

            }
        case CREATE_BOARD:
            return {
                ...state,
                boards: [action.payload, ...state.boards],
                loading: false
            }
        case PATCH_BOARD:
            const index = state.boards.findIndex(board => board.id === action.payload.id);
            if (index !== -1) {
                const updatedBoards = [...state.boards];
                updatedBoards[index] = action.payload;

                return {
                    ...state,
                    boards: [...updatedBoards],
                    loading: false
                };
            } else {
                return state;
            }
        case DELETE_BOARD:
            const afterDelete = [...state.boards]
            .filter(el => 
                {                    
                  return  el.id != action.payload
                })

            return {
                ...state,
                boards: [...afterDelete],
                loading: false
            }

        default:
            return state;
    }
};

export default boardReducer;