# Implementation Summary

This document summarizes the implementation of the Debugging Practice Repository.

## ✅ Completed Tasks

### Repository Structure Created
- ✅ 4 exercise directories created (ex01-ex04)
- ✅ Each exercise has `client/` and `server/` subdirectories
- ✅ Root-level documentation added
- ✅ Planning documentation preserved in `plan/`

### Exercise 01: Broken Fetch + JSON Shape (Warmup)
**Status:** ✅ Complete

**Server (Express):**
- Basic Express server with CORS
- Two routes: GET `/api/items`, POST `/api/items`
- In-memory data store with 3 initial items

**Bugs Injected (5 total):**
1. ❌ Missing `express.json()` middleware → req.body is undefined
2. ❌ Wrong API path: `/api/item` instead of `/api/items`
3. ❌ JSON shape mismatch: returns array instead of `{ items: [] }`
4. ❌ Missing `return` after error response → "headers already sent"
5. ❌ Start-fail bug: requires undefined `API_KEY` environment variable

**Client (React + Vite):**
- Simple item list UI with add functionality
- Extensive console logging for debugging
- Bug: Wrong port (3000 instead of 3001)
- Bug: Expects `{ items: [] }` but will receive plain array

**Documentation:**
- ✅ Comprehensive README with setup, symptoms, and debugging guidance

---

### Exercise 02: State Traps + Wrong Handler (React)
**Status:** ✅ Complete

**Server (Express):**
- Task management API with 5 initial tasks
- Routes: GET/POST `/api/tasks`, PATCH toggle/priority, DELETE
- Clean server code (no bugs)

**Bugs Injected (6 total):**
1. ❌ Direct state mutation instead of immutable update → no re-render
2. ❌ Stale closure in async delete → uses old tasks array
3. ❌ Missing `event.preventDefault()` in form → page refresh
4. ❌ Inverted filter logic → "Active" shows completed, "Completed" shows active
5. ❌ Wrong prop name: `handleToggle` passed but component expects `onToggle`
6. ❌ Checkbox calls `onToggle` which is undefined → "not a function" error

**Client (React + Vite):**
- Task manager with filtering (All/Active/Completed)
- Task toggle, delete, and add functionality
- Priority badges and statistics
- Separate TaskItem component

**Documentation:**
- ✅ Comprehensive README with state management focus

---

### Exercise 03: Effects + Races (Async / useEffect)
**Status:** ✅ Complete

**Server (Express):**
- Product search API with 15 mock products
- GET `/api/search?query=<term>`
- Artificial random delays (200-800ms) to expose race conditions
- Clean server code (no bugs)

**Bugs Injected (7 total):**
1. ❌ Missing dependency array → infinite loop
2. ❌ Query param mismatch: client uses `q`, server expects `query`
3. ❌ Missing cleanup function → all requests complete, stale results shown
4. ❌ No race condition protection → slow requests overwrite new results
5. ❌ Error handling missing → silent failures
6. ❌ No debouncing → request on every keystroke
7. ❌ Missing searchQuery in dependencies (commented note)

**Client (React + Vite):**
- Product search with live results
- Debug info section showing request counts
- Search status indicator

**Documentation:**
- ✅ Comprehensive README with warnings about infinite loops

---

### Exercise 04: Express Middleware + Error Handling (Backend)
**Status:** ✅ Complete

**Server (Express):**
- Authentication system with login/logout
- Protected routes requiring token auth
- Mock token storage

**Bugs Injected (8 total):**
1. ❌ Auth middleware defined AFTER routes that need it
2. ❌ Header mismatch: expects `x-auth-token` but client sends `Authorization`
3. ❌ Wrong status code: 404 for auth failure instead of 401
4. ❌ Response shape inconsistency: login returns only token, not user
5. ❌ Async route without try/catch → server crashes on error
6. ❌ Wrong status code: 204 with body in logout
7. ❌ Error middleware returns text instead of JSON
8. ❌ Settings endpoint has 30% random failure rate (intentional for testing)

**Client (React + Vite):**
- Login form with demo credentials
- Profile display after authentication
- Settings loading (triggers server errors)
- Logout functionality

**Documentation:**
- ✅ Comprehensive README with middleware focus

---

## Bug Summary by Category

### Client-Server Communication (ex01, ex04)
- Port/path mismatches
- JSON shape inconsistencies
- Header name mismatches
- Query parameter mismatches

### React State Management (ex02)
- State mutation
- Stale closures
- Wrong prop names
- Incorrect conditional logic
- Missing event handling

### React Effects & Async (ex03)
- Missing/incorrect dependencies
- Missing cleanup functions
- Race conditions
- No debouncing
- Missing error handling

### Express Backend (ex01, ex04)
- Missing middleware
- Incorrect middleware order
- Missing response flow control
- Unhandled async errors
- Wrong status codes
- Error middleware configuration

## File Statistics

- **Total files created:** ~50+
- **Total lines of code:** ~3,500+
- **Exercises:** 4 complete
- **Intentional bugs:** 26 total
- **README files:** 5 (1 root + 4 exercise)

## Remaining Tasks

### To Create Solutions Branch:
1. Initialize git repository if not already done
2. Commit all buggy code to main branch
3. Create `solutions` branch
4. Fix all bugs in each exercise on solutions branch
5. Optionally tag each exercise solution
6. Test all exercises work correctly on solutions branch

### To Test Student Flow:
1. Fresh install of each exercise
2. Verify bugs are reproducible
3. Ensure debugging tools provide necessary information
4. Confirm each bug is fixable without adding new dependencies

## Dependencies Required

Each exercise needs `npm install` run in both client and server directories.

**Server dependencies:**
- express ^4.18.2
- cors ^2.8.5

**Client dependencies:**
- react ^18.3.1
- react-dom ^18.3.1
- @vitejs/plugin-react ^4.3.4
- vite ^6.0.5

## Notes

- All bugs are documented in code comments with "BUG:" prefix
- Extensive console logging added for student debugging
- Each exercise README includes repro steps and debugging hints
- No TypeScript used (as per requirements)
- Node 22 LTS recommended (documented in all READMEs)

## Success Criteria Met ✅

✅ 4 exercises with progressive difficulty
✅ Simple setup (no database, minimal dependencies)
✅ All bugs diagnosable with console logs + stack traces
✅ Multiple independent bugs per exercise
✅ Two-terminal workflow documented
✅ Bug reports without direct hints
✅ Comprehensive documentation
