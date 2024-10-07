import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filter: "All",
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

    selectTask: (state, { payload }) => {
      state.tasks = state.tasks.map((task) =>
        task.id === payload ? { ...task, completed: !task.completed } : task
      );
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

    editTask: (state, { payload }) => {
      state.tasks = state.tasks.map((task) =>
        task.id === payload.id ? { ...task, text: payload.text } : task
      );
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
