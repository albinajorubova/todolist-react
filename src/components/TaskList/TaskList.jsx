import React, { useState, useCallback, useMemo } from "react";

import s from "./TaskList.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { removeTask, selectTask } from "../../redux/store/tasks/tasks.slice";

import TaskItem from "../TaskItem/TaskItem";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const activeFilter = useSelector((state) => state.tasks.filter);
  const [activeTaskId, setActiveTaskId] = useState(null);
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

  const handleOpenEdit = useCallback((taskId) => {
    setActiveTaskId(taskId);
  }, []);

  const handleCloseInput = useCallback(() => {
    setActiveTaskId(null);
  }, []);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        let shouldInclude;

        switch (activeFilter) {
          case "All":
            shouldInclude = true;
            break;
          case "Active":
            shouldInclude = !task.completed;
            break;
          case "Completed":
            shouldInclude = task.completed;
            break;
          default:
            shouldInclude = false;
            break;
        }

        return shouldInclude;
      }),
    [tasks, activeFilter]
  );

  return (
    <ul className={s.list}>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onRemoveTask={handleRemoveTask}
          onCheckboxChange={handleCheckbox}
          isEditingActive={activeTaskId === task.id}
          onOpenEdit={handleOpenEdit}
          onCloseEdit={handleCloseInput}
        />
      ))}
    </ul>
  );
};

export default TaskList;
