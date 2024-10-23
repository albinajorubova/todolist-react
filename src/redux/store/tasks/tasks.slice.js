import { createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";

const initialState = {
  tasks: [],
  filter: "All",
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      state.tasks.push({ id: uuidv4(), text: payload, completed: false });
    },

    removeTask: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },

    editTask: (state, { payload }) => {
      const task = state.tasks.find((task) => task.id === payload.id);

      if (task) {
        task.text = payload.text;
      }
    },

    selectTask: (state, { payload }) => {
      const task = state.tasks.find((task) => task.id === payload);

      if (task) {
        task.completed = !task.completed;
      }
    },

    selectAllTasks: (state) => {
      const allCompleted = state.tasks.every((task) => task.completed);

      state.tasks = state.tasks.map((task) => {
        return allCompleted
          ? { ...task, completed: false }
          : { ...task, completed: true };
      });
    },

    clearComplTasks: (state) => {
      state.tasks = state.tasks.filter((task) => !task.completed);
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTask,
  removeTask,
  selectTask,
  selectAllTasks,
  editTask,
  clearComplTasks,
  setFilter,
} = tasksSlice.actions;

export default tasksSlice.reducer;
