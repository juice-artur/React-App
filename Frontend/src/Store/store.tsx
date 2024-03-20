
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from "./taskReducer";
import columnReducer from './columnReducer';


const store = configureStore({
    reducer: {taskReducer, columnReducer}
});

export default store;


