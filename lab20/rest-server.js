import express from 'express';
import todosRouter from './routes/todos.js';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// 🔥 mount point
app.use('/api/todos', todosRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});