import './index.css'
import {Component} from 'react'
import TodoItem from '../TodoItem'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

class SimpleTodos extends Component {
  state = {
    todoList: initialTodosList,
    inputData: '',
  }

  deleteTodo = todoId => {
    const {todoList} = this.state
    const filteredUsersData = todoList.filter(each => each.id !== todoId)
    this.setState({
      todoList: filteredUsersData,
    })
  }

  onChangeInput = event => {
    this.setState({inputData: event.target.value})
  }

  onAddNewTask = () => {
    const {inputData} = this.state
    const trimmed = inputData.trim()

    if (trimmed === '') {
      return
    }

    const parts = trimmed.split(' ')
    const lastPart = parts[parts.length - 1]

    let count = 1
    let title = trimmed

    // If the input ends with a number, create that many todos
    if (!Number.isNaN(Number(lastPart)) && lastPart !== '') {
      count = parseInt(lastPart, 10)
      if (count < 1) {
        count = 1
      }
      title = parts.slice(0, -1).join(' ')
    }

    const newTodos = Array.from({length: count}, (_, index) => ({
      id: `${Date.now()}-${index}`,
      title,
    }))

    this.setState(prev => ({
      todoList: [...prev.todoList, ...newTodos],
      inputData: '',
    }))
  }

  onSaveExitingTask = (id, taskTitle) => {
    const {todoList} = this.state
    const newUpdatedList = todoList.map(each => {
      if (each.id === id) {
        return {...each, title: taskTitle}
      }
      return each
    })
    this.setState({todoList: newUpdatedList})
  }

  render() {
    const {todoList, inputData} = this.state

    return (
      <div className="bg-container">
        <div className="todo-card">
          <h1 className="heading">Simple Todos</h1>
          <div className="input-div-container">
            <input
              type="text"
              className="input"
              placeholder="Add Task"
              value={inputData}
              onChange={this.onChangeInput}
            />
            <button
              type="button"
              onClick={this.onAddNewTask}
              className="add-task-btn"
            >
              Add
            </button>
          </div>
          <ul className="todo">
            {todoList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoList={eachTodo}
                onEditedTask={this.onSaveExitingTask}
                deleteTodo={this.deleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
