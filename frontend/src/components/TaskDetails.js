import { useTasksContext } from "../hooks/useTasksContext"

// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import isToday from 'date-fns/isToday'
import isTomorrow from 'date-fns/isTomorrow'
import format from 'date-fns/format'

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext()

  const handleClick = async () => {
    const response = await fetch('/api/tasks/' + task._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_TASK', payload: json })
    }
  }

  // Convert dates once
  const startDate = task.start_date ? new Date(task.start_date) : null
  const endDate = task.end_date ? new Date(task.end_date) : null

  // Helpers
  const formatStartDate = () => {
    if (!startDate) return "N/A"
    if (isToday(startDate)) return "Today"
    return format(startDate, "dd MMM yyyy")
  }

  const formatEndDate = () => {
    if (!endDate) return "N/A"
    if (isTomorrow(endDate)) return "Tomorrow"
    return format(endDate, "dd MMM yyyy")
  }

  return (
    <div className="task-details">
      <h4>{task.title}</h4>

      <p>
        <strong>Description:</strong> {task.description}
      </p>

      <p>
        <strong>Start Date:</strong> {formatStartDate()}
      </p>

      <p>
        <strong>End Date:</strong> {formatEndDate()}
      </p>

      <p>
        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
      </p>

      <span
        className="material-symbols-outlined"
        onClick={handleClick}
      >
        done
      </span>
    </div>
  )
}

export default TaskDetails
