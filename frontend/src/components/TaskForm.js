import { useState } from "react"
import {useTasksContext} from "../hooks/useTasksContext"


const TaskForm = () => {
    const {dispatch} = useTasksContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [start_date, setStart_date] = useState('')
    const [end_date, setEnd_date] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit= async (e) => {
        e.preventDefault() 

        const task = {title, description, start_date, end_date}
        
        const API = process.env.REACT_APP_API_URL

        const response = await fetch(`${API}/api/tasks`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'content-type': 'application/json' }
        })

        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setDescription('')
            setEnd_date('')
            setStart_date('')
            setError(null)
            setEmptyFields([])
            console.log('new task added', json)
            dispatch({type:'CREATE_TASK', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Task </h3>

            <label>Task Title</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className= {emptyFields.includes('title')? 'error': ''}
            />

            <label>Description</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className= {emptyFields.includes('description')? 'error': ''}
            />

            <label>Start Date</label>
            <input
                type="date"
                onChange={(e) => setStart_date(e.target.value)}
                value={start_date}
                className= {emptyFields.includes('start_date')? 'error': ''}
            />

            <label>End Date</label>
            <input
                type="date"
                onChange={(e) => setEnd_date(e.target.value)}
                value={end_date}
                className= {emptyFields.includes('end_date')? 'error': ''}
            />

            <button>Add Task</button>
            {error && <div className= "error">{error}</div>}
        </form>
    )
}

export default TaskForm