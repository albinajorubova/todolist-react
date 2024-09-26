import React from "react";

const ToDoFilter = () => {
  return (
    <div className="tasksMenu">
      <div className="counterTasks">
        <span className="tasksCount">1</span> item left{" "}
      </div>
      <ul className="tasksFilters">
        <li className="tasksFilter__btn filterActive" data-tab="all">
          <button className="footerBtn">All</button>
        </li>
        <li className="tasksFilter__btn" data-tab="active">
          <button className="footerBtn">Active</button>
        </li>
        <li className="tasksFilter__btn" data-tab="completed">
          <button className="footerBtn">Completed</button>
        </li>
      </ul>
      <button className="clearComplBtn" onclick="clearCompletedTasks()">
        Clear completed
      </button>
    </div>
  );
};

export default React.memo(ToDoFilter);
