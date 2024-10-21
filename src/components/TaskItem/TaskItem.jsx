import React, { memo } from "react";
import cx from "classnames";

import s from "./TaskItem.module.scss";

import EditTask from "../EditTask/EditTask";

const TaskItem = memo(
  ({
    task,
    onRemoveTask,
    onCheckboxChange,
    isEditingActive,
    onOpenEdit,
    onCloseEdit,
  }) => {
    return (
      <li className={s.item}>
        <div className={s.content}>
          <input
            type="checkbox"
            className={s.check}
            name="checkInput"
            id={`item_${task.id}`}
            onChange={() => onCheckboxChange(task.id)}
            checked={task.completed}
          />
          <label
            className={cx(s.text, { [s.itemChecked]: task.completed })}
            onDoubleClick={() => onOpenEdit(task.id)}
          >
            {task.text}
          </label>
          <EditTask
            taskId={task.id}
            isActive={isEditingActive}
            text={task.text}
            onClose={() => onCloseEdit(task.id)}
          />
        </div>
        <button onClick={() => onRemoveTask(task.id)} className={s.deleteBtn} />
      </li>
    );
  }
);

export default TaskItem;
