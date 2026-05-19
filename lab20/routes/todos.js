import express from 'express';

const router = express.Router();

let todos = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Walk the dog', completed: true },
    { id: 3, title: 'Read a book', completed: false },
];
let nextId = 4;

// READ
router.get('/', (req, res) => {
    res.json(todos);
});

// UPDATE
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) return res.status(404).json({ error: 'Not found' });

    todo.completed = !todo.completed;
    res.json(todo);
});

// CREATE
router.post('/', (req, res) => {
    const newTodo = {
        id: nextId++,
        title: req.body.title,
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo); //created
});

// DELETE
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    todos = todos.filter(t => t.id !== id);
    res.status(204).end(); // 🔥 önemli
});

export default router;