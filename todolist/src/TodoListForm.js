import React, { useState } from "react"
import {Button, FormControl, InputLabel, MenuItem, Select, TextField, FormHelperText} from '@mui/material'


const TodoListForm = ({todoListData, setTodoList}) => {
  const [newTask, setNewTask] = useState({id:0, taskName: "", priority:-1, isComplete:false})
  const [formValidation, setFormValidation] = useState({
    taskNameHelperText: "",
    isTaskNameError: false,
    selectHelperText: "",
    isPriorityError: false,
  })

  const handleAddClick = () => {
    if(newTask.taskName.length > 0 && newTask.priority > -1){
      setTodoList({
        ...todoListData,
        items: [
          ...todoListData.items,
          { ...newTask, id: todoListData.items.length + 1 },
        ],
      }); 
      setNewTask({...newTask, taskName:""})
    }
  }

  const handleKeyPress = (event) => {
    if(event.key === "Enter") {
      handleAddClick()
    }
  }

  const handleOnChange = (event) => {
    switch (event.target.name) {
      case "taskName": {
        setNewTask({ ...newTask, taskName: event.target.value })
        break
      }
      case "priority": {
        setNewTask({ ...newTask, priority: event.target.value })
        break
      }
      case "sort": {
        setTodoList({...todoListData, sortMode:event.target.value})
        break;
      }
      default: {}
    }
  }

  const handleBlur = (event) => {
    switch (event.target.name) {
      case "taskName": {
        newTask.taskName.length <= 0
          ? setFormValidation({
              ...formValidation,
              taskNameHelperText: "Task name is Required",
              isTaskNameError: true,
            })
          : setFormValidation({
              ...formValidation,
              taskNameHelperText: "",
              isTaskNameError: false,
            })
        break;
      }

      case "priority": {
        newTask.priority < 0
          ? setFormValidation({
              ...formValidation,
              selectHelperText: "Priority is required",
              isPriorityError: true,
            })
          : setFormValidation({
              ...formValidation,
              selectHelperText: "",
              isPriorityError: false,
            })
        break;
      }

      default: {
        setFormValidation({
          taskNameHelperText: "",
          isTaskNameError: false,
          selectHelperText: "",
          isPriorityError: false,
        })
      }
    }
  }



    return (
      <div
        style={{ display: "flex", margin: "10px 0", justifyContent: "center" }}
      >
        <TextField
          name="taskName"
          error={formValidation.isTaskNameError}
          label="Task Name"
          variant="outlined"
          value={newTask.taskName}
          onChange={handleOnChange}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
          helperText={formValidation.taskNameHelperText}
        />

        <FormControl style={{ marginLeft: 20, width: 140 }} error={formValidation.isPriorityError}>
          <InputLabel id="priority-select">Priority</InputLabel>
          <Select
            name="priority"
            labelId="priority-select"
            value={newTask.priority}
            label="Priority"
            onChange={handleOnChange}
            onBlur={handleBlur}
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={0}>Low Priority</MenuItem>
            <MenuItem value={1}>Normal Task</MenuItem>
            <MenuItem value={2}>High Priority</MenuItem>
          </Select>
          <FormHelperText>{formValidation.selectHelperText}</FormHelperText>
        </FormControl>

        <FormControl style={{ marginLeft: 20, width: 200 }}>
          <InputLabel id="sort-select">Sort By</InputLabel>
          <Select
            name="sort"
            labelId="sort-select"
            value={todoListData.sortMode}
            label="Sort By"
            onChange={handleOnChange}
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={"PRIO_DESC"}>Priority: High to Low</MenuItem>
            <MenuItem value={"PRIO_ASC"}>Priority: Low to High</MenuItem>
            <MenuItem value={"NAME_ASC"}>Name: Ascending</MenuItem>
            <MenuItem value={"NAME_DESC"}>Name: Descending</MenuItem>
          </Select>
        </FormControl>

        <Button
          style={{ marginLeft: 10, height: 55}}
          disabled={newTask.taskName.length <= 0 || newTask.priority < 0}
          variant="contained"
          onClick={handleAddClick}
        >
          Add Task
        </Button>
      </div>
    );
}

export default TodoListForm