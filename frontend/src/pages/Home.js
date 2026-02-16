import { useEffect} from 'react'
import {useTasksContext} from "../hooks/useTasksContext"

// components
import TaskDetails from '../components/TaskDetails'
import TaskForm from '../components/TaskForm'


const Home = () => {
    const {tasks, dispatch} = useTasksContext()
    const API = process.env.REACT_APP_API_URL
    
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(`${API}/api/tasks`)

            


            const json = await response.json()

                if (response.ok) {
                    dispatch({type: 'SET_TASKS', payload: json})
                }
        }

        fetchTasks()
    }, [dispatch])

    return (
        <div className= "Home">  
           <div className= "Tasks">
            {tasks && tasks.map(task => (
             <TaskDetails  key={task._id} task={task} />

            ))}

           </div>
           <TaskForm/>
        </div>
    )
}




export default Home