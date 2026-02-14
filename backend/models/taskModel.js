const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tasksSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required:true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Task', tasksSchema)

