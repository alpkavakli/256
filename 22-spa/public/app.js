// memories, States
let todos = []

const todoList = document.getElementById("todo-list") //cacheing dom elements
fetchTodos()
async function fetchTodos() { //async yapmazsak funcı, await fln kullanamıoz
    const res = await fetch("/api/todos")
    todos = await res.json() //todos will be filled by incoming get request yani frontenddeyken backendden veri çekmiş olduk
    console.log(todos)
    renderList()
}
function renderList(){
    todoList.innerHTML = ""
    todos.forEach( t => {
        todoList.innerHTML += `<li class="${t.completed ? "done" : "pending"} ">${t.title}</li>`

    })
}