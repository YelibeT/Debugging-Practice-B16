# Debugging Practice Repository

A collection of intentionally buggy fullstack exercises designed to teach debugging skills for React and Express applications.

## Overview

This repository contains 4 standalone debugging exercises that progress from basic issues to more complex problems. Each exercise is a mini fullstack application with a Vite + React client and an Express server, both seeded with intentional bugs for students to find and fix.

## Prerequisites

- **Node.js 22 LTS** (recommended)
- npm
- Basic knowledge of React and Express
- Familiarity with browser DevTools (Console, Network tab)

## Repository Structure

```
.
├── ex01-broken-fetch/        # Exercise 01: Broken Fetch + JSON Shape
│   ├── client/               # React frontend
│   ├── server/               # Express backend
│   └── README.md            # Exercise instructions
│
├── ex02-state-traps/         # Exercise 02: State Traps + Wrong Handler
│   ├── client/               # React frontend
│   ├── server/               # Express backend
│   └── README.md            # Exercise instructions
│
├── ex03-effects-races/       # Exercise 03: Effects + Race Conditions
│   ├── client/               # React frontend
│   ├── server/               # Express backend
│   └── README.md            # Exercise instructions
│
├── ex04-express-middleware/  # Exercise 04: Express Middleware + Error Handling
│   ├── client/               # React frontend
│   ├── server/               # Express backend
│   └── README.md            # Exercise instructions
│
└── plan/                     # Project planning documents
```

## Exercises

### Exercise 01: Broken Fetch + JSON Shape (Warmup)
**Difficulty:** ⭐ Beginner

Basic client-server communication bugs including:
- Wrong API endpoints and port mismatches
- JSON shape mismatches between client and server
- Missing Express middleware
- Response flow control issues
- Environment configuration errors

**Key Learning:** Understanding API communication, debugging network requests, and Express basics.

---

### Exercise 02: State Traps + Wrong Handler (React)
**Difficulty:** ⭐⭐ Intermediate

React state management bugs including:
- Direct state mutation instead of immutable updates
- Stale closures in async callbacks
- Wrong prop names causing runtime errors
- Incorrect conditional rendering logic
- Missing form event handling

**Key Learning:** React state immutability, proper prop passing, and event handling.

---

### Exercise 03: Effects + Races (Async / useEffect)
**Difficulty:** ⭐⭐⭐ Advanced

Asynchronous React patterns and race conditions:
- Missing or incorrect useEffect dependencies
- Missing cleanup functions
- Race conditions with async requests
- Query parameter mismatches
- Missing error handling
- Lack of debouncing for user input

**Key Learning:** useEffect lifecycle, cleanup patterns, and handling async operations safely.

---

### Exercise 04: Express Middleware + Error Handling (Backend)
**Difficulty:** ⭐⭐⭐⭐ Challenge

Backend middleware and error handling bugs:
- Incorrect middleware ordering
- Header name mismatches (Authorization vs x-auth-token)
- Unhandled async errors crashing the server
- Wrong HTTP status codes
- Missing error middleware configuration
- Response shape inconsistencies

**Key Learning:** Express middleware order, proper error handling, and HTTP best practices.

## How to Use This Repository

### For Students

1. **Start with Exercise 01** and work your way up
2. **Read each exercise's README carefully** for setup instructions and bug symptoms
3. **Use the two-terminal workflow**: one for the server, one for the client
4. **Leverage debugging tools**:
   - Browser Console for client-side errors
   - Network tab for HTTP requests/responses
   - Server terminal for backend logs
   - Application logs (prefixed with `[App]`, `[TaskItem]`, etc.)
5. **Fix bugs one at a time** and test after each fix
6. **Don't look at the solutions branch** until you've attempted the exercise

### Running an Exercise

Each exercise follows the same pattern:

```bash
# Terminal 1 - Server
cd ex01-broken-fetch/server
npm install
npm start

# Terminal 2 - Client
cd ex01-broken-fetch/client
npm install
npm run dev
```

Then open your browser to `http://localhost:5173` (Vite's default port).

### For Instructors

- The `main` branch contains all buggy exercises for students
- The `solutions` branch (to be created) will contain fixed versions
- Each exercise is independent and can be used separately
- Exercises are designed to be completed in one lab session each

## Common Debugging Strategies

1. **Read error messages carefully** - they often point directly to the problem
2. **Check the browser console** for client-side errors and logs
3. **Use the Network tab** to inspect requests and responses
4. **Check the server terminal** for backend errors and logs
5. **Add strategic console.logs** to trace execution flow
6. **Isolate the problem** - is it client-side, server-side, or communication?
7. **Test assumptions** - verify that data is what you expect it to be
8. **Read the code** - understand what it's trying to do before fixing it

## Technologies Used

- **Frontend**: Vite, React 18 (JavaScript)
- **Backend**: Express.js, CORS
- **Runtime**: Node.js 22 LTS

## Educational Goals

This repository teaches students to:
- Use browser DevTools effectively for debugging
- Read and interpret error messages and stack traces
- Trace data flow between client and server
- Understand common React pitfalls (state mutation, stale closures, useEffect)
- Recognize Express middleware patterns and error handling
- Apply systematic debugging approaches
- Develop patience and persistence in problem-solving

## Tips for Success

- 🔍 **Debug systematically** - don't make random changes
- 📝 **Take notes** on what you've tried
- 🧪 **Test hypotheses** one at a time
- 💬 **Read all log output** - clues are everywhere
- ⏸️ **Take breaks** when stuck - fresh eyes help
- 🤝 **Collaborate** but ensure you understand each fix

## License

This repository is for educational purposes.

## Contributing

This is a teaching repository. If you find issues with the exercises themselves (not the intentional bugs!), please report them to the instructor.
