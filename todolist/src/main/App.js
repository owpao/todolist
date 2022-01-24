import "../styles/App.scss"
import {useEffect, useState} from 'react'
import Todolist from './Todolist'
import TodoListForm from './TodoListForm'
import Grid from "@mui/material/Grid"

const items = {sortMode: "",
  items: []
}

function App() {
  
  const [todoListData, setTodoList] = useState(()=> {
    const localStorageData = JSON.parse(localStorage.getItem("todoListData"))
    return localStorageData || items
  })
  
  useEffect(()=>{
    let sortedItems= []
    switch(todoListData.sortMode) {
      case "PRIO_ASC": {
        sortedItems = todoListData.items.sort((a,b) => a.priority-b.priority)
        break
      }
      case "PRIO_DESC": {
        sortedItems = todoListData.items.sort((a,b) => b.priority-a.priority)
        break
      }
      case "NAME_ASC": {
        sortedItems = todoListData.items.sort((a,b) => a.taskName.localeCompare(b.taskName))
        break
      }
      case "NAME_DESC": {
        sortedItems = todoListData.items.sort((a,b) => b.taskName.localeCompare(a.taskName))
        break
      }
      default:{
        sortedItems = todoListData.items.sort((a,b) => a.id-b.id)
        break
      }
    }
    
    setTodoList({...todoListData, items: sortedItems})
  }, [todoListData.sortMode])

  //to store data using localstorage as a simple database
  useEffect(()=> {
    localStorage.setItem("todoListData", JSON.stringify(todoListData))
  }, [todoListData])

  const handleDeleteTask = (id) => {
    let filteredList = todoListData.items.filter(item=>item.id !== id)
    setTodoList({...todoListData, items: filteredList})
  }

  const toggleCompleteTask = (id) => {
    let editedList = todoListData.items.map(task => {
      return task.id === id ? { ...task, isComplete: !task.isComplete } : { ...task}
    });
    setTodoList({...todoListData, items: editedList})
  }

  return (
    <Grid container className='todolist-container'>
      <Grid item xl={8} xs={12}>
        <div className='todolist-header'>
          <h1>TO-DO List</h1>
          <h4>
            Completed:{" "}
            {todoListData.items.filter((item) => item.isComplete).length}/
            {todoListData.items.length}
          </h4>
        </div>
      </Grid>

      <Grid item xl={8} xs={12}>
        <TodoListForm setTodoList={setTodoList} todoListData={todoListData} />
      </Grid>

      <Grid item xl={8} xs={12}>
        <Todolist
          todoListData={todoListData.items}
          handleToggleTask={toggleCompleteTask}
          handleDeleteTask={handleDeleteTask}
        />
      </Grid>
    </Grid>
  );
}

export default App;
