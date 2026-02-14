const Task = require('../models/taskModel')
const mongoose = require ('mongoose')

// get all tasks
const getTasks = async (req, res) => {
    const tasks = await Task.find({}).sort({createdAt: -1})

    res.status(200).json(tasks)
}

// get single task
const getTask = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({error: 'No Such Task'})

    }

    res.status(200).json(task)
}

// create a task
const createTask = async ( req, res ) => {
    const {title, description, start_date, end_date} = req.body 

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    
    if(!description) {
        emptyFields.push('description')
    }
    
    if(!start_date) {
        emptyFields.push('start_date')
    }

    if(!end_date) {
        emptyFields.push('end_date')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill all the fields', emptyFields})
    }

    // add doc to db
    try{
        const task = await Task.create({title, description, start_date, end_date})
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error: error.massage})
    }    
}


// delete task
const deleteTask = async (req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such task'})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if (!task) {
        return res.status(400).json({error: 'No Such Task'})

    }

    res.status(200).json(task)
}


// update task
const updateTask = async (req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'no such task'})
    }
    
    const task = await Task.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!task) {
        return res.status(400).json({error: 'No Such Task'})

    }

    res.status(200).json(task)
}


module.exports = {
    getTask,
    getTasks,
    createTask,
    deleteTask,
    updateTask
    
}