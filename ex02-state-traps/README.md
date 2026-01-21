# Exercise 02: State Traps + Wrong Handler

This exercise focuses on React state management bugs, including state mutation, stale closures, incorrect prop names, and conditional rendering logic errors.

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

When you try to use the task manager application, you may encounter several issues:

1. Checking/unchecking tasks doesn't update the UI reliably
2. The filter buttons show the wrong tasks (Active shows completed, Completed shows active)
3. Clicking the checkbox on a task causes a JavaScript error in the console
4. Adding a new task causes the page to refresh and lose all state
5. Deleting tasks behaves unpredictably, especially when deleting multiple tasks quickly
6. Task counts may not update correctly

### Expected Behavior

The application should:

1. Display a list of 5 tasks with different priorities
2. Show accurate counts for total, active, and completed tasks
3. Allow users to toggle task completion by clicking the checkbox
4. Filter tasks correctly:
   - "All" shows all tasks
   - "Active" shows only uncompleted tasks
   - "Completed" shows only completed tasks
5. Allow users to add new tasks with priority levels
6. Allow users to delete tasks
7. Update the UI immediately when tasks are toggled, added, or deleted
8. Maintain state when performing actions (no page refresh)

### Reproduction Steps

1. Start both server and client
2. Open the client in your browser
3. Check the browser console for any errors
4. Try toggling a task's checkbox - observe if the UI updates
5. Try clicking the "Active" filter button - observe which tasks are shown
6. Try clicking the "Completed" filter button - observe which tasks are shown
7. Try adding a new task - observe if the page refreshes
8. Try deleting multiple tasks in quick succession - observe the behavior
9. Watch the task counts as you perform various actions

## Where to Look

To debug these issues, you should:

- Check the **browser console** for errors, especially "undefined is not a function"
- Look at the **React component state management** patterns in App.jsx
- Examine how state is being **updated** - is it mutated or replaced?
- Check for **stale closures** in async functions and callbacks
- Review **prop names** passed to child components vs. what they expect
- Look at the **conditional logic** in filter functions
- Check for **preventDefault()** calls in form handlers
- Use the console logs prefixed with `[App]` and `[TaskItem]` to trace execution flow

Remember: React requires **immutable state updates** - always create new arrays/objects rather than mutating existing ones. Watch out for stale values captured in closures!

## Notes

- The server runs on port 3001 and has no bugs
- All bugs are in the React client code
- The application has extensive console logging to help you trace the flow
- State management bugs can be subtle and may only appear under certain conditions
