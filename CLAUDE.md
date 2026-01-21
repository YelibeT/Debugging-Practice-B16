# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **debugging practice repository** containing intentionally buggy fullstack exercises for SEM2 coursework. The exercises teach students systematic debugging techniques using React and Express.js.

## ⚠️ IMPORTANT: Intentional Bugs

**This repository contains intentional bugs for educational purposes.**

### For Claude Code:
- The `main` branch contains **intentionally buggy code** for student practice
- DO NOT automatically fix bugs unless explicitly asked to create solutions
- When analyzing code, acknowledge that bugs are intentional and pedagogical
- If asked to help debug, provide guidance and questions rather than direct fixes
- The bugs are features, not mistakes to be corrected

### Repository Structure

- `ex01-broken-fetch/` - Warmup exercise (API communication bugs)
- `ex02-state-traps/` - Intermediate (React state management bugs)
- `ex03-effects-races/` - Advanced (useEffect and async bugs)
- `ex04-express-middleware/` - Challenge (Express middleware and error handling bugs)
- `plan/` - Planning documentation

### Exercise Pattern

Each exercise follows this structure:
```
exXX-name/
├── client/          # Vite + React frontend (buggy)
├── server/          # Express backend (buggy for ex04, clean for others)
└── README.md        # Bug report and instructions
```

### Running Exercises

Two-terminal workflow:
```bash
# Terminal 1
cd server && npm install && npm start

# Terminal 2
cd client && npm install && npm run dev
```

### Solutions Branch

Solutions will be maintained on a separate `solutions` branch. The main branch should always contain the buggy teaching version.

## Project Conventions

- **Node.js**: 22 LTS recommended
- **Frontend**: Vite + React (JavaScript, not TypeScript)
- **Backend**: Express with CORS
- **Ports**: Server on 3001, Client on 5173 (Vite default)
- **API Prefix**: `/api/*`
- **Logging**: Extensive console logs with `[Component]` prefixes for debugging practice

## Technologies

- React 18.3+ (JavaScript)
- Vite 6.0+
- Express 4.18+
- Node.js 22 LTS
