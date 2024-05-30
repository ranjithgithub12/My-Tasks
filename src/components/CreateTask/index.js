import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagsList from '../TagsList'
import TaskList from '../TaskList'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class CreateTask extends Component {
  state = {
    tagValue: tagsList[0].optionId,
    userInput: '',
    listOfTags: tagsList,
    createTaskList: [],
    selectTag: '',
  }

  onSubmitTask = event => {
    event.preventDefault()

    const {userInput, tagValue} = this.state

    const newTasks = {
      id: uuidv4(),
      userInput,
      tagValue,
    }

    this.setState(prevState => ({
      createTaskList: [...prevState.createTaskList, newTasks],
      userInput: '',
      tagValue: tagsList[0].optionId,
    }))
  }
  onChangeTagValue = event => {
    this.setState({tagValue: event.target.value})
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  selectTheTaskType = displayText => {
    this.setState(prevState => {
      const SameTag = prevState.selectTag === displayText
      return {
        selectTag: SameTag ? '' : displayText,
      }
    })
  }
  getFilterCreateTask = () => {
    const {createTaskList, selectTag} = this.state
    if (selectTag === '') {
      return createTaskList
    } else {
      return createTaskList.filter(eachList => eachList.tagValue === selectTag)
    }
  }
  render() {
    const {tagValue, userInput, listOfTags, selectTag} = this.state
    const getFilterTask = this.getFilterCreateTask()
    const lengthOfTask = getFilterTask.length === 0
    return (
      <div className="app-contianer">
        <div className="create-task-container">
          <form className="form-container" onSubmit={this.onSubmitTask}>
            <h1 className="create-heading">Create a task!</h1>
            <label className="label-content" htmlFor="task">
              Task
            </label>
            <input
              value={userInput}
              type="text"
              id="task"
              onChange={this.onChangeUserInput}
              className="input-width"
              placeholder="Enter the task here"
            />
            <label className="label-content" htmlFor="tags">
              Tags
            </label>
            <select
              className="input-width"
              id="tags"
              value={tagValue}
              onChange={this.onChangeTagValue}
            >
              {tagsList.map(eachList => (
                <option key={eachList.optionId} value={eachList.optionId}>
                  {eachList.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-button">
              Add Task
            </button>
          </form>
        </div>
        <div className="tag-container">
          <h1 className="tag-name">Tags</h1>
          <ul className="unorder-list-of-tags">
            {listOfTags.map(eachList => (
              <TagsList
                key={eachList.optionId}
                tagList={eachList}
                selectTheTaskType={this.selectTheTaskType}
                isActive={selectTag === eachList.optionId}
              />
            ))}
          </ul>
          <h1 className="tag-name">Tasks</h1>
          {lengthOfTask ? (
            <div className="no-task-container">
              <p className="no-task">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul>
              {getFilterTask.map(eachList => (
                <TaskList key={eachList.id} taskList={eachList} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default CreateTask
