import React from "react";
import Task from "./Task";

const Todolist = ({ todoListData, handleToggleTask, handleDeleteTask }) => {
  return (
    <div>
      {todoListData.map((item) => (
        <Task task={item} handleTaskClick={handleToggleTask} handleTaskDelete={handleDeleteTask} />
      ))}
    </div>
  );
};

export default Todolist;
