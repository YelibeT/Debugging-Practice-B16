# Execution Order

1) Confirm the target runtime/tooling assumptions (Node 22 LTS recommended; npm OK).

2) Create the top-level exercise folders:
- `ex01-broken-fetch/`
- `ex02-state-traps/`
- `ex03-effects-races/`
- `ex04-express-middleware/`

3) For each exercise, scaffold `server/` first:
- Initialize `package.json`
- Add minimal Express server with `/api/*` routes
- Add clear request/error logging points

4) For each exercise, scaffold `client/` second:
- Create Vite+React JS app
- Add minimal UI that calls the exercise’s API
- Add “debug-friendly” logs at user actions + request boundaries

5) Implement the **working baseline** behavior for each exercise (everything correct).

6) Inject the seeded bugs (one at a time), verifying after each injection:
- Bug is reproducible
- Error signal is visible (console/network/server log/stack trace)
- Bug is fixable without adding new tooling

7) Write each exercise’s `README.md`:
- Setup + run steps (two-terminal workflow)
- Bug report + repro steps
- Expected behavior (no hints)

8) Create the `solutions` branch and fix issues exercise-by-exercise:
- Apply minimal, educational fixes
- Optionally add tags: `ex01-solved` … `ex04-solved`

9) Smoke-check the student flow on `main`:
- Install + run
- Reproduce each bug from docs

10) Smoke-check the fixed flow on `solutions`:
- Install + run
- Confirm expected behavior for each exercise
