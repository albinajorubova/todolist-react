import React, { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { addTask } from "../redux/store/tasks/tasks.slice";

const TaskForm = () => {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      dispatch(addTask(taskText));
      setTaskText("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      handleAddTask();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [taskText]);

  return (
    <div className="todoInputBlock" ref={inputRef}>
      <input
        type="text"
        className="todoInputBlock"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
    </div>
  );
};

export default TaskForm;
