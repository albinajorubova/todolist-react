import "./App.css";

import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import TaskFilter from "./components/TaskFilter/TaskFilter";

function App() {
  return (
    <div className="App">
      <h1>todos</h1>
      <div className="container">
        <TaskForm />
        <TaskList />
        <TaskFilter />
      </div>
    </div>
  );
}

export default App;
