import './index.css'

const TagsList = props => {
  const {tagList, selectTheTaskType, isActive} = props
  const {optionId, displayText} = tagList

  const onClickTaskType = () => {
    selectTheTaskType(optionId)
  }
  const active = isActive ? 'tag-button-color' : ''
  return (
    <li className="list-of-tag-list">
      <button className={`tag-button ${active}`} onClick={onClickTaskType}>
        <p>{displayText}</p>
      </button>
    </li>
  )
}

export default TagsList
