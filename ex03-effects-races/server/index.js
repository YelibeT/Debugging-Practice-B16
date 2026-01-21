const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Mock database of products
const products = [
  { id: 1, name: 'JavaScript: The Good Parts', category: 'books', price: 29.99 },
  { id: 2, name: 'React Programming', category: 'books', price: 39.99 },
  { id: 3, name: 'Node.js Design Patterns', category: 'books', price: 44.99 },
  { id: 4, name: 'Wireless Mouse', category: 'electronics', price: 24.99 },
  { id: 5, name: 'Mechanical Keyboard', category: 'electronics', price: 89.99 },
  { id: 6, name: 'USB-C Hub', category: 'electronics', price: 49.99 },
  { id: 7, name: 'Laptop Stand', category: 'accessories', price: 34.99 },
  { id: 8, name: 'Monitor Riser', category: 'accessories', price: 29.99 },
  { id: 9, name: 'Cable Organizer', category: 'accessories', price: 12.99 },
  { id: 10, name: 'TypeScript Handbook', category: 'books', price: 34.99 },
  { id: 11, name: 'Bluetooth Speaker', category: 'electronics', price: 59.99 },
  { id: 12, name: 'Desk Lamp', category: 'accessories', price: 39.99 },
  { id: 13, name: 'Python Crash Course', category: 'books', price: 32.99 },
  { id: 14, name: 'Webcam HD', category: 'electronics', price: 79.99 },
  { id: 15, name: 'Notebook Set', category: 'accessories', price: 15.99 }
];

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ${JSON.stringify(req.query)}`);
  next();
});

// Search endpoint with artificial delay to simulate network latency
// BUG: Server uses query param 'query' but client might use different param name
app.get('/api/search', (req, res) => {
  const searchQuery = req.query.query; // Server expects 'query' param
  console.log('GET /api/search - Query:', searchQuery);

  if (!searchQuery) {
    console.log('No search query provided, returning empty results');
    return res.json({ results: [] });
  }

  // Simulate variable network latency (200-800ms)
  const delay = Math.floor(Math.random() * 600) + 200;
  console.log(`Simulating ${delay}ms delay for query: "${searchQuery}"`);

  setTimeout(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const results = products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );

    console.log(`Returning ${results.length} results for query: "${searchQuery}"`);
    res.json({ results });
  }, delay);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`GET /api/products/${id} - Fetching product`);

  const product = products.find(p => p.id === id);

  if (!product) {
    console.error(`Product ${id} not found`);
    return res.status(404).json({ error: 'Product not found' });
  }

  // Small delay to simulate DB lookup
  setTimeout(() => {
    console.log(`Returning product: ${product.name}`);
    res.json({ product });
  }, 100);
});

// Get all products
app.get('/api/products', (req, res) => {
  console.log('GET /api/products - Fetching all products');
  res.json({ products });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  GET /api/search?query=<term>');
  console.log('  GET /api/products');
  console.log('  GET /api/products/:id');
  console.log('\nSearch is configured with random delays (200-800ms) to simulate network conditions');
});
