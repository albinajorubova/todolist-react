import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      state.tasks.push({ id: Date.now(), text: payload, completed: false });
    },

    removeTask: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },

    editeTask: (state, { payload }) => {
      state.tasks = state.tasks.map((task) =>
        task.id === payload ? { ...task, completed: !task.completed } : task
      );
    },
  },
});

export const { addTask, removeTask, editeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
