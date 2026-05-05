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
        todoList.innerHTML += `<li class="${t.completed ? "done" : "pending"} "
        data-id="${t.id}"
        >${t.title}</li>`

    })
}

//Creating a new todo
const todoForm = document.getElementById("todo-form")
const titleEl = document.getElementById("todo-input")

todoForm.addEventListener("submit", async (e) => {
    e.preventDefault() //don't prevent post packet for me I'll do it myself.
    const title = titleEl.value;
   const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type" : "application/json"},
    body: JSON.stringify({title})
   })
  //  alert("you added title: " + title ? )

  const newTodo = await res.json()  
  console.log(newTodo)
  todos.push(newTodo)
  renderList()
  titleEl.value = ""
})

//Event delegation, we will delegate to parent

todoList.addEventListener("click", async(e) => {
    //alert("you clicked " + e.target.tagName)
    if (e.target.tagName == "LI"){
        const id = parseInt(e.target.dataset.id)
        const res = await fetch(`/api/todos/${id}`, {method: "PATCH"})
        const updated = await res.json() //backend is updates we also have to update the frontend
        const index = todos.findIndex( t => t.id === id)
        todos[index] = updated;
       // renderList();
        e.target.classList.toggle("done")
        e.target.classList.toggle("pending")
    }
})