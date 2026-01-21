const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Mock user database
const users = {
  'user123': {
    id: 'user123',
    username: 'john_doe',
    email: 'john@example.com',
    role: 'user'
  },
  'admin456': {
    id: 'admin456',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin'
  }
};

// Mock token storage (in production, use JWT with proper validation)
const validTokens = new Set();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  next();
});

// BUG: Auth middleware defined AFTER it's used - will not protect routes correctly
// Should be defined before route handlers that use it

// Public route - no auth required
app.post('/api/login', (req, res) => {
  console.log('POST /api/login - Login attempt');
  const { username, password } = req.body;

  if (!username || !password) {
    console.error('Missing username or password');
    return res.status(400).json({ error: 'Username and password required' });
  }

  // Simple mock auth - accepts any password for demo users
  const user = Object.values(users).find(u => u.username === username);

  if (!user) {
    console.error('User not found:', username);
    // BUG: Wrong status code - should be 401 (Unauthorized), using 404
    return res.status(404).json({ error: 'Invalid credentials' });
  }

  // Generate a simple mock token
  const token = `token_${user.id}_${Date.now()}`;
  validTokens.add(token);

  console.log('Login successful, token generated:', token);
  // BUG: Response shape inconsistency - should return { token, user }, but only returns token
  res.json({ token });
});

// BUG: Middleware order wrong - auth middleware applied AFTER public routes
// This means the auth check happens for routes defined before it, but not correctly
const authMiddleware = (req, res, next) => {
  console.log('Auth middleware - Checking authentication');

  // BUG: Header name mismatch - looking for 'x-auth-token' but client might send 'Authorization'
  const token = req.headers['x-auth-token'];
  console.log('Token from header:', token);

  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  if (!validTokens.has(token)) {
    console.error('Invalid token:', token);
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Extract user ID from token (mock implementation)
  const userId = token.split('_')[1];
  req.userId = userId;
  console.log('Token valid, user ID:', userId);
  next();
};

// Protected route - requires auth
// BUG: Auth middleware not properly applied - route defined before middleware is created
app.get('/api/profile', authMiddleware, (req, res) => {
  console.log('GET /api/profile - Fetching profile for user:', req.userId);

  const user = users[req.userId];

  if (!user) {
    console.error('User not found for ID:', req.userId);
    return res.status(404).json({ error: 'User not found' });
  }

  console.log('Returning profile:', user.username);
  res.json({ user });
});

// Protected route with async error (simulates DB query failure)
// BUG: Missing try/catch - async errors will crash the server
app.get('/api/settings', authMiddleware, async (req, res) => {
  console.log('GET /api/settings - Fetching settings for user:', req.userId);

  // Simulate an async operation that might fail
  const shouldFail = Math.random() < 0.3; // 30% chance of failure

  if (shouldFail) {
    console.error('Simulated async error in /api/settings');
    // BUG: Throwing in async route without try/catch causes unhandled promise rejection
    throw new Error('Database connection failed');
  }

  const settings = {
    theme: 'dark',
    notifications: true,
    language: 'en'
  };

  res.json({ settings });
});

// Route that triggers an error
app.post('/api/logout', authMiddleware, (req, res) => {
  console.log('POST /api/logout - Logging out user:', req.userId);

  const token = req.headers['x-auth-token'];

  if (token) {
    validTokens.delete(token);
    console.log('Token invalidated:', token);
  }

  // BUG: Wrong status code - logout should return 200, using 204 but still sending body
  res.status(204).json({ message: 'Logged out successfully' });
});

// BUG: Error handling middleware defined incorrectly or missing next(err) calls
// When errors occur, they're not properly passed to error handler
app.use((err, req, res, next) => {
  console.error('Error middleware - Caught error:', err.message);
  console.error('Stack:', err.stack);

  // BUG: Not sending proper error response structure
  res.status(500).send('Something broke!'); // Should use json() and proper status codes
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  POST /api/login (public)');
  console.log('  GET  /api/profile (protected)');
  console.log('  GET  /api/settings (protected)');
  console.log('  POST /api/logout (protected)');
  console.log('\nDemo credentials:');
  console.log('  Username: john_doe (any password)');
  console.log('  Username: admin (any password)');
});
