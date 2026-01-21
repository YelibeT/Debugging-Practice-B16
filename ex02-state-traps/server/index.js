const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// In-memory data store for tasks
let tasks = [
  { id: 1, text: 'Learn React state management', completed: false, priority: 'high' },
  { id: 2, text: 'Practice debugging', completed: false, priority: 'medium' },
  { id: 3, text: 'Build a todo app', completed: true, priority: 'low' },
  { id: 4, text: 'Review ES6 features', completed: false, priority: 'medium' },
  { id: 5, text: 'Study async patterns', completed: false, priority: 'high' }
];

let nextId = 6;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
  console.log('GET /api/tasks - Fetching all tasks');
  console.log('Current tasks:', tasks.length);
  res.json({ tasks });
});

// Toggle task completion
app.patch('/api/tasks/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`PATCH /api/tasks/${id}/toggle - Toggling task completion`);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    console.error(`Task ${id} not found`);
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = !task.completed;
  console.log(`Task ${id} toggled to completed=${task.completed}`);
  res.json({ task });
});

// Update task priority
app.patch('/api/tasks/:id/priority', (req, res) => {
  const id = parseInt(req.params.id);
  const { priority } = req.body;
  console.log(`PATCH /api/tasks/${id}/priority - Setting priority to ${priority}`);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    console.error(`Task ${id} not found`);
    return res.status(404).json({ error: 'Task not found' });
  }

  if (!['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ error: 'Invalid priority value' });
  }

  task.priority = priority;
  console.log(`Task ${id} priority updated to ${priority}`);
  res.json({ task });
});

// Add new task
app.post('/api/tasks', (req, res) => {
  console.log('POST /api/tasks - Creating new task, body:', req.body);

  const { text, priority } = req.body;

  if (!text) {
    console.error('POST /api/tasks - Error: text is required');
    return res.status(400).json({ error: 'Text is required' });
  }

  const newTask = {
    id: nextId++,
    text,
    completed: false,
    priority: priority || 'medium'
  };

  tasks.push(newTask);
  console.log('POST /api/tasks - Task created:', newTask);
  res.status(201).json({ task: newTask });
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`DELETE /api/tasks/${id} - Deleting task`);

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    console.error(`Task ${id} not found`);
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  console.log(`Task ${id} deleted`);
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  GET    /api/tasks');
  console.log('  POST   /api/tasks');
  console.log('  PATCH  /api/tasks/:id/toggle');
  console.log('  PATCH  /api/tasks/:id/priority');
  console.log('  DELETE /api/tasks/:id');
});
