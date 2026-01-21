# Exercise 04: Express Middleware + Error Handling

This exercise focuses on backend bugs in Express.js, including middleware ordering, authentication issues, header mismatches, async error handling, and incorrect HTTP status codes.

## Setup Instructions

This exercise requires running both a client and a server in separate terminal windows.

### Prerequisites

- Node.js 22 LTS (recommended)
- npm

### Installation

1. Install server dependencies:
```bash
cd server
npm install
```

2. Install client dependencies:
```bash
cd client
npm install
```

## Running the Exercise

You need two terminal windows:

**Terminal 1 - Server:**
```bash
cd server
npm start
```

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```

The client will be available at `http://localhost:5173` (default Vite port).

## Bug Report

### Symptoms

When you try to use the authentication application, you may encounter several issues:

1. Login fails with "No token provided" or authentication errors
2. The profile page shows "Unauthorized" or "Invalid token" errors
3. The server crashes when loading settings
4. Status codes don't match the actual success/failure state
5. Header mismatches between client and server cause authentication failures
6. Logout behaves unexpectedly or returns confusing errors

### Expected Behavior

The application should:

1. Allow users to log in with demo credentials (username: john_doe or admin, any password)
2. Receive a token upon successful login
3. Display the user's profile information after login
4. Allow users to load their settings (theme, notifications, language)
5. Handle errors gracefully without crashing the server
6. Allow users to log out successfully
7. Return appropriate HTTP status codes for different scenarios:
   - 200 for successful operations
   - 401 for authentication failures
   - 400 for bad requests
   - 500 for server errors

### Reproduction Steps

1. Start both server and client
2. Open the client in your browser
3. Try to log in with username "john_doe" and any password
4. Observe the error messages in both browser console and server terminal
5. Check the Network tab for:
   - Request headers being sent
   - Response status codes
   - Response bodies
6. If login succeeds, try clicking "Load Settings" multiple times
7. Watch the server terminal for any crashes or errors
8. Try to log out and observe any issues

## Where to Look

To debug these issues, you should:

- Check the **server terminal** for:
  - Error messages and stack traces
  - Log messages showing what headers are received
  - Unhandled promise rejections or crashes
- Check the **browser Network tab** for:
  - Request headers being sent (Authorization vs x-auth-token)
  - Response status codes (404 vs 401, 200 vs 204)
  - Response body content
- Check the **browser console** for client-side errors
- Examine the **middleware order** in the server code - when are middlewares defined vs. when are routes defined?
- Look for **async/await** patterns - are errors properly caught with try/catch?
- Review **header names** - do client and server use the same header name for tokens?
- Check **status codes** - do they accurately reflect the situation?
- Look for **response shape** consistency - does the server always return the expected format?
- Check **error middleware** - is it properly configured to handle all errors?

Remember:
- Middleware order matters in Express - middleware must be defined before the routes that use it
- Async route handlers need try/catch or proper error forwarding
- HTTP status codes have specific meanings (401 = Unauthorized, 404 = Not Found)
- Header names are case-sensitive in some contexts
- 204 No Content should not have a response body

## Notes

- The server uses a simple token-based auth system (not production-ready JWT)
- The settings endpoint has a 30% chance of simulated failure to expose error handling bugs
- All bugs are in the server code and client-server communication
- Pay close attention to middleware execution order
- Watch for server crashes in the terminal
