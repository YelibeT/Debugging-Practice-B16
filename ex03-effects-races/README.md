# Exercise 03: Effects + Races (Async / useEffect)

This exercise focuses on asynchronous bugs in React, including useEffect dependency issues, race conditions, missing cleanup functions, and query parameter mismatches.

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

When you try to use the product search application, you may encounter several critical issues:

1. The browser becomes unresponsive or extremely slow shortly after typing
2. The search doesn't work at all - no results appear even for valid queries
3. Typing quickly causes many simultaneous requests to the server
4. Search results sometimes show outdated data from previous searches
5. The "Request #" counter increases rapidly and uncontrollably
6. Errors are not displayed to the user even when requests fail
7. The application makes a new request for every single keystroke

### Expected Behavior

The application should:

1. Display a search box for finding products
2. Wait briefly after the user stops typing before making a search request (debouncing)
3. Show a loading indicator while searching
4. Display search results matching the query
5. Handle only the most recent search request, ignoring outdated responses
6. Show error messages to the user if search fails
7. Cancel pending requests when a new search is initiated
8. Not cause browser performance issues or infinite loops

### Reproduction Steps

1. Start both server and client
2. Open the client in your browser
3. **IMPORTANT**: Check browser console immediately - you may see hundreds of log messages
4. Try typing a single character in the search box - observe browser behavior
5. If the page becomes unresponsive, refresh and check console for infinite loop
6. Try typing "key" quickly - observe how many requests are made (check Debug Info section)
7. Look at the Network tab to see if requests are using the correct URL parameters
8. Check if search results actually appear
9. Try typing "book" then quickly typing "mouse" - observe which results appear

## Where to Look

To debug these issues, you should:

- Check the **browser console** for errors and excessive logging
- Look at the **useEffect** dependency array - what happens when it's missing or incorrect?
- Examine the **Network tab** to see:
  - How many requests are being made
  - What URL parameters are being sent
  - What responses are coming back
- Check for **cleanup functions** in useEffect - are they present?
- Look for **race condition** protection - does the code check if a response is still relevant?
- Examine **error handling** - are errors being caught and displayed?
- Consider **debouncing** - should every keystroke trigger an API call?
- Review the **query parameter names** - do client and server agree?

Remember:
- useEffect without proper dependencies can cause infinite loops
- Async operations in useEffect need cleanup to prevent race conditions
- Debouncing user input prevents excessive API calls
- Always validate that responses are still relevant before using them

## Notes

- The server intentionally adds random delays (200-800ms) to simulate real network conditions
- This makes race conditions more visible and reproducible
- The server has no bugs - all issues are in the React client
- Pay special attention to how useEffect is configured
- The Debug Info section shows request counts to help identify excessive requests
