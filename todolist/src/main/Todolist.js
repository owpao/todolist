import React from "react";
import Task from "./Task";

const Todolist = ({ todoListData, handleToggleTask, handleDeleteTask }) => {
  return (
    <div style={{padding: 10}}>
      {todoListData.map((item,key) => (
        <Task key={key} task={item} handleTaskClick={handleToggleTask} handleTaskDelete={handleDeleteTask} />
      ))}
    </div>
  );
};

export default Todolist;
