import React from "react"
import RemoveIcon from '@mui/icons-material/Remove'
import { Checkbox } from "@mui/material";

const PRIORITY_COLORS = {
  LOW_PRIORITY : '#55efc4',
  NORMAL_TASK : '#ffeaa7',
  HIGH_PRIORITY: '#ff7675'
}

const Task = ({task, handleTaskClick, handleTaskDelete}) => {
    return (
      <div
        style={{
          justifyContent: "space-between", alignItems:'center',
          display: "flex",
          margin: "5px 0",
          backgroundColor:
            task.priority === 0
              ? PRIORITY_COLORS.LOW_PRIORITY
              : task.priority === 1
              ? PRIORITY_COLORS.NORMAL_TASK
              : PRIORITY_COLORS.HIGH_PRIORITY,
          padding: 10,
          borderRadius: 10
        }}
      >
        <div style={{display:"flex", alignItems:'center'}}>
          <Checkbox checked = {task.isComplete} onClick={() => handleTaskClick(task.id)} />
          <span
            style={{
              textDecoration: task.isComplete ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => handleTaskClick(task.id)}
          >
            {task.taskName}
          </span>
        </div>
        <RemoveIcon style={{cursor: "pointer"}} onClick={() => handleTaskDelete(task.id)} />
      </div>
    );
}

export default Task;