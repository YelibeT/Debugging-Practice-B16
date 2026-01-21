# Debugging Practice Repo Plan (React + Express)

This repository will contain 4 standalone mini fullstack exercises (each with a Vite+React JS `client/` and a plain Express `server/`) that are intentionally coded poorly and seeded with a mix of “fails to start” and “runs but behaves wrong” bugs. Each exercise includes a short bug report and reproduction steps that push students to use browser/server consoles, stack traces, and strategic `console.log` statements to isolate root causes and apply fixes. Instructor-only fixes live on a separate `solutions` git branch.

## Goals

- Provide 4 exercises with a clear difficulty ladder (warmup → challenge).
- Keep setup simple (no database; minimal dependencies).
- Make every bug diagnosable with console logs + stack traces (no hidden magic).
- Ensure each exercise has multiple independent bugs (students can practice multiple passes).
- Support instructors with a complete `solutions` branch.

## Constraints / Decisions

- Frontend: Vite + React (JavaScript, not TypeScript).
- Backend: Express only, in-memory “data” (arrays/objects).
- Run workflow: two terminals per exercise (separate `client/` and `server/` installs).
- Node version target: Node 22 LTS (documented as recommended).
- Bug report docs: short; includes repro steps and expected behavior; no hints.

## Repository Structure (proposed)

- `ex01-broken-fetch/`
  - `client/`
  - `server/`
- `ex02-state-traps/`
  - `client/`
  - `server/`
- `ex03-effects-races/`
  - `client/`
  - `server/`
- `ex04-express-middleware/`
  - `client/`
  - `server/`
- `plan/` (this folder)

## Cross-Exercise Conventions

- Ports: server uses `3001` by default; client uses Vite default (`5173`).
- API prefix: `/api/*`.
- Logging conventions:
  - Server: log request method/path, key params, and error paths.
  - Client: log user actions, request start/end, and key state transitions.

## Exercise Designs (baseline + seeded bugs)

### Exercise 01: Broken Fetch + JSON Shape (Warmup)

**Baseline behavior**
- UI shows a list of items and can add a new item.
- API: `GET /api/items`, `POST /api/items`.

**Seeded bug menu (target 4–6 bugs)**
- Client points to wrong API base URL/port/path → 404 or network error.
- JSON shape mismatch (`[]` vs `{ items: [] }`) causing `undefined.map` or empty UI.
- Server missing `express.json()` → `req.body` is `undefined`, item creation fails.
- Control flow bug (missing `return` after sending response) → “headers already sent”.
- Optional start-fail bug: missing required env/config value with a clear startup error.

### Exercise 02: State Traps + Wrong Handler (React)

**Baseline behavior**
- Filterable list with toggle status and derived counts.

**Seeded bug menu (target 5–7 bugs)**
- Mutating state in place → UI doesn’t re-render reliably.
- Stale state closure in async path → increments/toggles behave inconsistently.
- Wrong prop name passed into a component → `undefined is not a function`.
- Incorrect conditional rendering logic → items disappear or never update.
- Form handler prevents default incorrectly or not at all → refresh / lost state.

### Exercise 03: Effects + Races (Async / useEffect)

**Baseline behavior**
- Search box queries the server (debounced) and renders results.

**Seeded bug menu (target 6–8 bugs)**
- `useEffect` dependency mistake → infinite loop or never fires.
- Missing debounce cleanup → multiple outdated requests.
- Race condition: slow response overwrites newer query results.
- Query param mismatch (`q` vs `query`) → empty results while “working”.
- Error handling missing on client → silent failures without logging.

### Exercise 04: Express Middleware + Error Handling (Backend)

**Baseline behavior**
- “Login” returns a fake token; protected route returns a profile.

**Seeded bug menu (target 6–8 bugs)**
- Middleware order incorrect → auth always fails or always passes.
- Header mismatch (`Authorization` vs `x-auth-token`) → token not found.
- Async route throws without `try/catch` → crash/unhandled rejection.
- Wrong status codes/body shapes → client misinterprets success/failure.
- Missing `next(err)` path or error middleware configured incorrectly.

## Documentation Deliverables (per exercise)

- `README.md` in each exercise root containing:
  - Setup commands (`npm install` for `client/` and `server/`).
  - Run commands (`npm run dev` for client; `npm start`/`npm run dev` for server).
  - Bug report: symptoms, repro steps, expected behavior.
  - “Where to look” section that directs students to check browser console, network tab, and server logs (no hints to the fix).

## Instructor Solutions

- `main` branch: buggy teaching version.
- `solutions` branch: all exercises fixed.
- Optional tags on `solutions`: `ex01-solved`, `ex02-solved`, `ex03-solved`, `ex04-solved`.

## Validation Checklist

- Fresh install works on Node 22 LTS for each exercise.
- Each seeded bug is reproducible from the written repro steps.
- Each bug is diagnosable with:
  - A stack trace OR a failing request in Network tab OR explicit server/client logs.
- Fixing one bug does not “accidentally” fix all others (bugs remain independent).
- After applying all fixes (solutions branch), each exercise matches expected behavior.
