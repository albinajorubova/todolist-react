export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("tasksSlice");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("tasksSlice", serializedState);
  } catch (err) {
    console.error("Cant save", err);
  }
};
