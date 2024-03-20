
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from "./taskReducer";


const store = configureStore({
    reducer: {taskReducer}
});

export default store;


