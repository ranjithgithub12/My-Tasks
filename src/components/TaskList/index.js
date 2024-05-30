import './index.css'

const TaskList = props => {
  const {taskList} = props
  const {id, userInput, tagValue} = taskList

  return (
    <li className="list-of-task">
      <p className="user-input">{userInput}</p>
      <p className="task-type">{tagValue}</p>
    </li>
  )
}

export default TaskList
