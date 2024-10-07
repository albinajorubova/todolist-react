import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks/tasks.slice";
import { loadState, saveState } from "../../utils/localStorage";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: {
    tasks: persistedState,
  },
});

store.subscribe(() => {
  saveState(store.getState().tasks);
});

export default store;
