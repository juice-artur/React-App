import { Board } from "../types/Board";
import { GET_BOARDS } from "./actionType";

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

        default:
            return state;
    }
};

export default boardReducer;