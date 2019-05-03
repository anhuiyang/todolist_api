const mongoose = require('mongoose')

let todoSchema = mongoose.Schema({
    title: {
        type: String, 
        require: true
    },
    completed: {
        type: Boolean, 
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

let Todo = module.exports = mongoose.model('Todo', todoSchema)

module.exports.getTodos = (callback)=>{
    Todo.find(callback)
}
module.exports.addTodos = (todo, callback)=>{
    Todo.create(todo, callback)
}
module.exports.updateTodo = (id, todo, callback)=>{
    let query = {_id: id}
    let update = {$set: todo}
    Todo.findByIdAndUpdate(query, update, callback)
}
module.exports.deleteTodo = (id, callback)=>{
    let query = {_id: id}
    Todo.remove(query, callback)
}