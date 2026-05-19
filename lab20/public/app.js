// Single Page Application for managing todos
// States, memories
let todos = []
let sorted = false;

const todoList = document.getElementById('todo-list');//cacheing dom elements
fetchTodos();
async function fetchTodos() {
    const response = await fetch('/api/todos');
    todos = await response.json();//todos will be filled by incoming get request yani frontenddeyken backendden veri çekmiş olduk
    //console.log(todos)
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = '';
    let displayedTodos = [...todos];
    if (sorted) {
        displayedTodos.sort((a, b) => a.title.localeCompare(b.title));
    }
    displayedTodos.forEach(todo => {
        todoList.innerHTML += `<li 
                                class="${todo.completed ? 'done' : 'pending'}" 
                                data-id="${todo.id}"
                                >
                                 ${todo.title} 
                                - 
                                <button class="delete-btn" 
                                        data-id="${todo.id}">
                                        Delete
                                </button>
                              </li>`;
    });
}


const todoForm = document.getElementById('todo-form');
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();//don't prevent post packet for me I'll do it myself
    const title = document.getElementById('todo-input').value;
    const res =await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
    });
     //  alert("you added title: " + title ? )

    const newTodo = await res.json();
    todos.push(newTodo);
    renderTodos();
    document.getElementById('todo-input').value = '';
});

// Event delegation for toggling completion and deleting todos
todoList.addEventListener('click', async (e) => {
    // Click todo item to toggle completion
    if (e.target.tagName === 'LI') {
        const id = e.target.dataset.id;
        const res = await fetch(`/api/todos/${id}`, {
            method: 'PATCH'
        });
        const updatedTodo = await res.json();
        const index = todos.findIndex(todo => todo.id === updatedTodo.id);
        todos[index] = updatedTodo;
        e.target.classList.toggle('done');
        e.target.classList.toggle('pending');
        // renderTodos();
    
    } else if (e.target.classList.contains('delete-btn')) {
        // Click delete button to remove todo
        const id = e.target.dataset.id;
        const res = await fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        });
        todos = todos.filter(todo => todo.id !== parseInt(id));
        e.target.parentElement.remove(); // Remove the <li> element from the DOM
        // renderTodos();
    }
});

// Sort todos by title
const sortBtn = document.getElementById('sortByTitle');
sortBtn.addEventListener('change', (e) => {
    sorted = e.target.checked;
    renderTodos();
}); 