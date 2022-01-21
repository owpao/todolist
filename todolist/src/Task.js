import React from "react"
import RemoveIcon from '@mui/icons-material/Remove'
import { Checkbox } from "@mui/material";



const Task = ({task, handleTaskClick, handleTaskDelete}) => {

  const task_priority_class =  task.priority === 0 ? "low_prio" : task.priority === 1 ? "norm_prio" : "high_prio"
  const task_label_class = task.isComplete ? "task_complete" : ""
    return (
      <div className={`task-container ${task_priority_class}`}>
        <div className="task-details">
          <Checkbox
            checked={task.isComplete}
            onClick={() => handleTaskClick(task.id)}
          />
          <span
            className={`task-label ${task_label_class}`}
            onClick={() => handleTaskClick(task.id)}
          >
            {task.taskName}
          </span>
        </div>
        <RemoveIcon
          className='remove-icon'
          onClick={() => handleTaskDelete(task.id)}
        />
      </div>
    );
}

export default Task;