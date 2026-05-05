import express from "express"
const router = express.Router()//it returns a router object which is almost similar to an app like app.get app.post and we can register endpoints and middlewares only for this router
// "/api/todos yazmamıza gerek yokmuş altta router getle relative fln bişiler dedi"

router.use(express.json()) //if the content is json it parses it and adds it to req body

let todos = [
    { id:1, title: "Buy Bazinga", completed: false},
    { id:2, title: "Sell Bazinga", completed: true},
    { id:3, title: "Task Bazinga", completed: false},
]
let nextId = 4

router.get("/", (req, res)=> {
    res.json(todos) //object has become json string then putted into response part
} ) 

router.post("/", (req, res) => { //we can not test post with browser so we will use curl -X POST http://localhost:3000/api/todos -H "CONTENT-Type: application/json" -d "{}" "{title": "Hello there"}" 
    //-H is used to add header 
    //bir de completed: false'ı da yazmak lazımdı
    const title = req.body.title
    const newTodo = { id: nextId++, title, completed:false} //if we said title:title ,first title is the property name second is the value
    todos.push(newTodo);
    res.status(201).json(newTodo); //201 means resourse is successfully created then we send info to client
})

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id) //curl -X DELETE http://localhost:3001/api/todos/2 to test
    todos = todos.filter(t => t.id !== id) //if the task id is not same with the given id then put it into todos array
    res.status(204).json({message: id + "deleted"}) //204 means successfully deleted
})

router.patch("/:id", (req, res) => {
    const id = parseInt(req.params.id) //curl -X PATCH http://localhost:3001/api/todos/2 -v to test
    const todo = todos.find( t => t.id === id)
    todo.completed = !todo.completed;
    res.json(todo).status(200)
})
export default router