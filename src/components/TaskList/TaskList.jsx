import React, { useState, useCallback } from "react";

import s from "./TaskList.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { removeTask, selectTask } from "../../redux/store/tasks/tasks.slice";

import EditTask from "../EditTask/EditTask";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const activeFilter = useSelector((state) => state.tasks.filter);
  const [activeTasks, setActiveTasks] = useState({});
  const dispatch = useDispatch();

  const handleRemoveTask = useCallback(
    (taskId) => {
      dispatch(removeTask(taskId));
    },
    [dispatch]
  );

  const handleCheckbox = useCallback(
    (taskId) => {
      dispatch(selectTask(taskId));
    },
    [dispatch]
  );

  const handleOpenEdit = (taskId) => {
    setActiveTasks((prev) => ({
      ...prev,
      [taskId]: true,
    }));
  };

  const handleCloseInput = (taskId) => {
    setActiveTasks((prev) => ({
      ...prev,
      [taskId]: false,
    }));
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Active") return !task.completed;
    if (activeFilter === "Completed") return task.completed;
    return false;
  });

  return (
    <ul className={s.list}>
      {filteredTasks.map((task) => (
        <li key={task.id} className={s.item}>
          <div className={s.content}>
            <input
              type="checkbox"
              className={s.check}
              name="checkInput"
              id={`item_${task.id}`}
              onChange={() => handleCheckbox(task.id)}
              checked={task.completed}
            />
            <label
              className={s.text}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#949494" : "black",
              }}
              onDoubleClick={() => handleOpenEdit(task.id)}
            >
              {task.text}
            </label>
            <EditTask
              taskId={task.id}
              isActive={activeTasks[task.id]}
              text={task.text}
              onClose={() => handleCloseInput(task.id)}
            />
          </div>
          <button
            onClick={() => handleRemoveTask(task.id)}
            className={s.deleteBtn}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
