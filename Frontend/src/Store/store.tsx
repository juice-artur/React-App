
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from "./taskReducer";
import columnReducer from './columnReducer';
import boardReducer from './boardReducer';


const store = configureStore({
    reducer: {taskReducer, columnReducer, boardReducer}
});

export default store;


