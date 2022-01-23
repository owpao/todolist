import App from '../main/App'
import {mount} from "enzyme"
import TodoListForm from "../main/TodoListForm"

describe("TodolistTest", ()=> {
  let app
  beforeEach(()=>{
    app = mount(<App/>)
  })

  it("should render the component properly", ()=> {
    const container = app.find(".todolist-container")
    const headerTitle = container.find("h1")
    const taskCount = container.find("h4")

    expect(taskCount.text()).toEqual("Completed: 0/0")
    expect(headerTitle.text()).toEqual("TO-DO List")
    expect(container.find("TodoListForm").exists()).toEqual(true)
    expect(container.find("Todolist").exists()).toEqual(true)
  })
})
