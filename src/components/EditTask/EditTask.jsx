import React, { useState, useEffect, useRef, useCallback } from "react";

import s from "./EditTask.module.scss";

import { useDispatch } from "react-redux";
import { editTask } from "../../redux/store/tasks/tasks.slice";

const EditTask = ({ taskId, isActive, text, onClose }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(text);
  const editRef = useRef(null);

  const handleEditTask = useCallback(
    (taskId, value) => {
      if (value.trim() !== "") {
        dispatch(editTask({ id: taskId, text: value }));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isActive) {
      setInputValue(text);
      return;
    }

    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        setInputValue(text);
        onClose();
      } else if (event.key === "Enter") {
        handleEditTask(taskId, inputValue);
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        setInputValue(text);
        onClose();
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [taskId, inputValue, onClose, isActive, text, handleEditTask]);

  return (
    <input
      type="text"
      className={s.input}
      ref={editRef}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      style={{ display: isActive ? "block" : "none" }}
    />
  );
};

export default React.memo(EditTask);
