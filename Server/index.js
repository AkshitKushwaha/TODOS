const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require("./Models/Todo")

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome")
})

const conn = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test')
        console.log("Connected to MongoDB")
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

conn();

//Routing

//GET
app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch((err) => res.json(err))
})


//POST
app.post('/add', async (req, res) => {
    try {
        const task = req.body.task;
        await TodoModel.create({
            task: task
        }).then(
            (result) => {
                console.log(result)
                res.status(201).json({msg: "Task Added"})
            }
        )
    } catch (err) {
        console.log(err)
    }
})

//UPDATE
app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

//DELETE
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
