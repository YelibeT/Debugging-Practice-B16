const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// In-memory data store
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

let nextId = 4;

// Middleware
app.use(cors());
// BUG: Missing express.json() middleware - will cause req.body to be undefined
// app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// BUG: Wrong path - should be /api/items but using /api/item
app.get('/api/item', (req, res) => {
  console.log('GET /api/items - Fetching all items');
  // BUG: JSON shape mismatch - returning array instead of object with items property
  res.json(items);
});

app.post('/api/items', (req, res) => {
  console.log('POST /api/items - Creating new item, body:', req.body);

  const { name } = req.body;

  if (!name) {
    console.error('POST /api/items - Error: name is required');
    res.status(400).json({ error: 'Name is required' });
    // BUG: Missing return - will cause "headers already sent" error
  }

  const newItem = {
    id: nextId++,
    name
  };

  items.push(newItem);
  console.log('POST /api/items - Item created:', newItem);
  res.status(201).json(newItem);
});

// BUG: Start-fail bug - reading from undefined environment variable
const requiredConfig = process.env.API_KEY;
if (!requiredConfig) {
  console.error('STARTUP ERROR: Missing required API_KEY environment variable');
  console.error('Please set API_KEY before starting the server');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  GET  /api/items');
  console.log('  POST /api/items');
});
