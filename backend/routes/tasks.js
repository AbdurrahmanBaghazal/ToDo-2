const express = require('express')
const {
    createTask,
    getTask,
    getTasks,
    deleteTask,
    updateTask
} = require('../controllers/taskController')

const router = express.Router()

//GET all tasks
router.get('/', getTasks)

//GET single task
router.get('/:id', getTask)

//Post new task
router.post('/', createTask )

//delete  task
router.delete('/:id', deleteTask)

//UPDATE  task
router.patch('/:id', updateTask)


module.exports = router