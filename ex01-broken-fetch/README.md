# Exercise 01: Broken Fetch + JSON Shape

This exercise focuses on basic client-server communication bugs, including incorrect API endpoints, JSON shape mismatches, and missing middleware configuration.

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

When you try to use the application, you may encounter several issues:

1. The server fails to start with an error message about a missing configuration
2. The item list doesn't display any items even though the server has data
3. Adding new items fails silently or shows errors
4. Server errors appear in the console about "headers already sent"

### Expected Behavior

The application should:

1. Start successfully (both client and server)
2. Display a list of 3 initial items on page load
3. Allow users to add new items via the input form
4. Show new items in the list immediately after adding them
5. Display appropriate error messages if something goes wrong

### Reproduction Steps

1. Try to start the server - observe any startup errors
2. Once running, open the client in your browser
3. Check the browser console for any errors
4. Check the browser Network tab for failed requests
5. Try to add a new item using the form
6. Observe the server terminal for any error messages

## Where to Look

To debug these issues, you should:

- Check the **browser console** for client-side errors and logs
- Check the **Network tab** in browser DevTools to see request/response details
- Check the **server terminal** for error messages and request logs
- Look at the API endpoint URLs being called
- Examine the JSON data structure being sent and received
- Review the Express middleware configuration

Remember: The application has debug logs already in place. Use `console.log` statements in both the client (`[App]` prefix) and server to trace the flow of data.

## Notes

- The server should run on port 3001
- The client expects the API to be available at the server's `/api/*` endpoints
- All bugs in this exercise can be diagnosed using console output, network inspection, and error messages
