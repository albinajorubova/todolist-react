import React from "react";
import "./style.css";

import { useDispatch, useSelector } from "react-redux";
import { removeTask, editeTask } from "../redux/store/tasks/tasks.slice";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  const handleCheckbox = (taskId) => {
    dispatch(editeTask(taskId));
  };

  return (
    <ul className="taskList">
      {tasks.map((task) => (
        <li key={task.id} className="taskItem">
          <div class="taskContent">
            <input
              type="checkbox"
              name="checkInput"
              id={`item_${task.id}`}
              onChange={() => handleCheckbox(task.id)}
            />
            <label
              htmlFor={`item_${task.id}`}
              className="taskContent__label"
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </label>
            <input type="text" class="editItemInput" />
          </div>
          <button
            onClick={() => handleRemoveTask(task.id)}
            className="taskItem__deleteBtn"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
