import { React, useMemo } from "react";
import cx from "classnames";

import s from "./TaskFilter.module.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  clearComplTasks,
  setFilter,
} from "../../redux/store/tasks/tasks.slice";

const FILTERS = ["All", "Active", "Completed"];

const TaskFilter = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const activeFilter = useSelector((state) => state.tasks.filter);
  const anyCompleted = tasks.some((task) => task.completed);
  const dispatch = useDispatch();

  const handleClearComplTasks = () => {
    dispatch(clearComplTasks());
  };

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => !task.completed);
  }, [tasks]);

  return (
    <>
      {tasks.length > 0 && (
        <div className={s.menu}>
          <div className={s.counter}>
            <span className={s.count}>{filteredTasks.length}</span>
            item{filteredTasks.length > 1 ? "s" : ""} left
          </div>
          <ul className={s.filters}>
            {FILTERS.map((filter) => (
              <li
                className={cx(s.name, { [s.active]: activeFilter === filter })}
                key={filter}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </li>
            ))}
          </ul>
          {anyCompleted && (
            <button
              className={s.clearCompl}
              onClick={() => handleClearComplTasks()}
            >
              Clear completed
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default TaskFilter;
