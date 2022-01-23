import "../styles/App.scss"
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import Todolist from './Todolist'
import TodoListForm from './TodoListForm'

const items = {sortMode: "",
  items: [
  // { id: 1, taskName: "item 1", isComplete: false, priority:0 },
  // { id: 2, taskName: "item 2", isComplete: false, priority:1 },
  // { id: 3, taskName: "item 3", isComplete: false, priority:1 },
  // { id: 4, taskName: "item 4", isComplete: false, priority:2 },
  // { id: 5, taskName: "item 5", isComplete: false, priority:0 }
]
}

function App() {
  
  const [todoListData, setTodoList] = useState(items)
  
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

  const handleDeleteTask = (id) => {
    let filteredList = todoListData.items.filter(item=>item.id !== id)
    setTodoList({...todoListData, items:filteredList})
  }

  const toggleCompleteTask = (id) => {
    let editedList = todoListData.items.map(task => {
      return task.id === id ? { ...task, isComplete: !task.isComplete } : { ...task}
    });
    setTodoList({...todoListData, items:editedList})
  }

  return (
    <Container className='todolist-container'>
      <div className='todolist-header'>
        <h1>TO-DO List</h1>
        <h4>
          Completed:{" "}
          {todoListData.items.filter((item) => item.isComplete).length}/
          {todoListData.items.length}
        </h4>
      </div>

      <TodoListForm setTodoList={setTodoList} todoListData={todoListData} />

      <Todolist
        todoListData={todoListData.items}
        handleToggleTask={toggleCompleteTask}
        handleDeleteTask={handleDeleteTask}
      />
    </Container>
  );
}

export default App;
