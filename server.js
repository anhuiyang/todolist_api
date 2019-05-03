const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todolistapi', { useNewUrlParser: true })
const db = mongoose.connection

const Todo = require('./models/Todo')

app.get('/', (req, res)=>{
    Todo.getTodos((err, todos)=>{
        err ? res.send(err.message) : res.json(todos)
    })
})
app.post('/', (req, res)=>{
    let todo = req.body
    Todo.addTodos(todo, (err, todos)=>{
        err ? res.send(err.message) : res.json(todos)
    })
})
app.put('/:_id', (req, res)=>{
    let id = req.params._id
    let todo = req.body
    Todo.updateTodo(id, todo, (err, todos)=>{
        err ? res.send(err.message) : res.json(todos)
    })
})
app.delete('/:_id', (req, res)=>{
    let id = req.params._id
    Todo.deleteTodo(id, (err, todos)=>{
        err ? res.send(err.message) : res.json(todos)
    })
})

app.listen(process.env.PORT || 3000, ()=>{console.log('app is live')})