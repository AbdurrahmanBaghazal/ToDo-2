require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const tasksRoutes = require('./routes/tasks')


//express app
const app = express()

//meddleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routs
app.use('/api/tasks', tasksRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
 //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listen on port', process.env.PORT)
        })
    })

    .catch((error)=>{
        console.log(error)
    })

