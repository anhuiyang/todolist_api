const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    next();
});

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

app.listen(process.env.PORT || 1234, ()=>{console.log('app is live')})