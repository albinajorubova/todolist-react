import React, { useState, useEffect, useRef, useCallback } from "react";
import cx from "classnames";

import s from "./TaskForm.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { addTask, selectAllTasks } from "../../redux/store/tasks/tasks.slice";

const TaskForm = () => {
  const [taskText, setTaskText] = useState("");
  const tasks = useSelector((state) => state.tasks.tasks);
  const allCompleted = tasks.every((task) => task.completed);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleAddTask = useCallback(() => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText("");
    }
  }, [taskText, dispatch]);

  const handleAllCheckbox = () => {
    dispatch(selectAllTasks());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        handleAddTask();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleAddTask]);

  return (
    <div className={s.block} ref={inputRef}>
      <input
        type="text"
        className={s.input}
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        placeholder="What needs to be done?"
        autoFocus
      />
      {tasks.length > 0 && (
        <div className={s.allComplBtn}>
          <input type="checkbox" className={s.checkbox} />
          <label
            className={cx(s.label, { [s.black]: allCompleted })}
            onClick={handleAllCheckbox}
          />
        </div>
      )}
    </div>
  );
};

export default TaskForm;
