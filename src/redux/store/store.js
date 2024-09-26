import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks/tasks.slice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
