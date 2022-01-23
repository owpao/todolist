import {mount} from "enzyme"
import TodoListForm from "../main/TodoListForm"
import {Button, Select, TextField} from "@mui/material"
import {render, screen, waitFor} from "@testing-library/react"
import userEvent from "@testing-library/user-event/dist"
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect"

let todoListData = {
    sortMode:"", items:[]
}

describe("TodoListFormTest",()=>{
    let wrapper = mount(<TodoListForm todoListData={todoListData} />)

    it("renders", ()=> {
        const todoListForm = wrapper.find(".todolist-form")

        const taskNameField = todoListForm.find(TextField)
        const prioritySelect = todoListForm.find(Select).first()
        const sortSelect = todoListForm.find(Select).at(1)
        const addButton = todoListForm.find(Button)

        expect(taskNameField.exists()).toEqual(true)
        expect(taskNameField.props().label).toEqual("Task Name")

        expect(prioritySelect.exists()).toEqual(true)
        expect(prioritySelect.props().label).toEqual("Priority")
        expect(prioritySelect.props().value).toEqual(-1)

        expect(sortSelect.exists()).toEqual(true)
        expect(sortSelect.props().label).toEqual("Sort By")
        expect(sortSelect.props().value).toEqual("")

        expect(addButton.exists()).toEqual(true)
        expect(addButton.text()).toEqual("Add Task")
        expect(addButton.props().disabled).toEqual(true)
    })

    it("renders with enabled submit button", async () => {
        render(<TodoListForm todoListData={todoListData}/>)

        userEvent.type(screen.getByLabelText("Task Name"), "sample task name")
        userEvent.click(screen.getByLabelText("Priority"))
        await waitFor(() => userEvent.click(screen.getByText("Low Priority")))

        expect(screen.getByText("Add Task")).not.toBeDisabled()
    })

    it("adds task", async () => {

        const setTodoList = (todolist) => {
            todoListData = {...todolist}
        }

        render(<TodoListForm todoListData={todoListData} setTodoList={setTodoList}/>)

        userEvent.type(screen.getByLabelText("Task Name"), "sample task name")
        userEvent.click(screen.getByLabelText("Priority"))
        await waitFor(() => userEvent.click(screen.getByText("Low Priority")))

        expect(screen.getByText("Add Task")).not.toBeDisabled()
        userEvent.click(screen.getByText("Add Task"))

        expect(screen.getByText("Add Task")).toBeDisabled()
        expect(todoListData.items.length).toEqual(1)
        expect(todoListData.items[0]).toEqual({taskName: "sample task name", id: 1, isComplete: false, priority: 0})
    })


})