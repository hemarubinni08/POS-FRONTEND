# SESSION HANDOFF — POS Frontend (Next.js Rebuild)

## Who is the user?
- Name: Shoaib Ejaz
- Git user: Shoaib Ejaz
- Knowledge level: Very beginner in JS/React — knows variables, functions, map basics only
- Project was built using AI — user is learning to understand and debug it themselves
- Explain things simply with real examples tied to actual project code
- Never just give explanations — always show hands-on examples from the project

---

## Background
The old project was React 18 + Vite. The trainer scrapped it.
This is a **complete rebuild** using **Next.js** with the **App Router (folder-based routing)**.
Everything needs to be recreated from scratch — Login and Register are done so far.

---

## Project Location
```
C:\Training\POS\Pos-Frontend-Next.Js\pos-next\
```

## Tech Stack
- **Next.js 16** + **React 19**
- **Tailwind CSS 4** (note: v4 config is different from v3 — uses `postcss.config.mjs`, no `tailwind.config.js`)
- **Axios** for API calls
- **No React Router** — routing is handled by Next.js folder structure
- Backend: Spring Boot at `http://localhost:8080/api`
- Auth: JWT token stored in `localStorage`

---

## Folder-Based Routing (Next.js App Router)
Each page is a `page.jsx` file inside a folder under `app/`.
```
app/
├── Login/page.jsx          → URL: /Login
├── Register/page.jsx       → URL: /Register
├── profile/
│   ├── layout.jsx          → wraps all /profile/* pages (Sidebar + Header)
│   ├── page.jsx            → URL: /profile  (dashboard)
│   ├── brand/
│   │   ├── page.jsx        → URL: /profile/brand        (list)
│   │   ├── add/page.jsx    → URL: /profile/brand/add
│   │   └── edit/[id]/page.jsx → URL: /profile/brand/edit/123
│   ├── shelf/ ...same pattern
│   ├── racks/ ...same pattern
│   ├── model/ ...same pattern
│   ├── product/ ...same pattern
│   ├── user/ ...same pattern
│   └── category/ ...same pattern
```
- `layout.jsx` = persistent wrapper (like the old `Layout.jsx` with Sidebar/Header)
- `[id]` in a folder name = dynamic route parameter (like `:id` in React Router)
- `"use client"` at top of file = needed for useState, useEffect, onClick, etc.

---

## Key Files

### app/api/axiosInstance.js
- axios with JWT interceptor
- base URL: `http://localhost:8080/api`
- Public paths (no token needed): `/authenticate`, `/user/add`, `/role/findAllActive`
- Redirects to `/login` on 401 or missing token

### app/Login/page.jsx ✅ DONE
- POST to `/authenticate` with `{ username, password }`
- On success: saves token + username to localStorage, routes to `/profile`
- Uses `useRouter` from `next/navigation` (NOT react-router-dom)

### app/Register/page.jsx ✅ DONE (has a bug — see below)
- POST to `/user/add` with `{ username, name, password, phoneNo, roles }`
- Fetches roles from `/role/findAllActive` on load
- ⚠️ **BUG:** Uses `navigate('/login')` on lines 32 and 130 — this is React Router syntax
  Fix: replace both with `router.push('/login')` (router is already declared at line 15)

---

## What Still Needs to Be Built (in order)
1. **app/profile/layout.jsx** — Sidebar + Header wrapper for all protected pages
2. **app/profile/page.jsx** — dashboard/home page after login
3. **Brand** — list, add, edit pages
4. **Shelf** — list, add, edit pages
5. **Racks** — list, add, edit pages
6. **Model** — list, add, edit pages
7. **Product** — list, add, edit pages
8. **User** — list, add, edit pages
9. **Category** — list, add, edit pages

---

## Old Project Patterns to Recreate
(These were in the old React+Vite project — same backend, same APIs, recreate in Next.js style)

### API patterns
- List (paginated): POST to `/{entity}/list` with body `{ pageNo, sizePerPage }`
  Response: `{ data: [...], totalPages, totalElements }`
- Add: POST to `/{entity}/add`
- Update: POST to `/{entity}/update`
- Find by ID: GET to `/{entity}/find/{id}`
- Active list for dropdowns: POST to `/{entity}/list` (some entities use GET `/findAllActive`)

### Supercategory dropdown
- Uses POST to `/category/list` — NOT GET `/category/findAllActive` (that endpoint doesn't exist)

### Column patterns for list tables
```js
// Simple column — display a field directly
{ label: "ID", field: "id" }

// Custom column — when you need custom rendering (e.g. arrays, nested objects)
{ label: "Shelf", render: (item) => item.shelf?.map(s => <span key={s}>{s}</span>) }
```

### Boolean fields (like "status")
- Send as actual boolean `true`/`false` to backend, not string "true"/"false"

---

## Key Concepts for Beginner
- `"use client"` at top = this page uses browser features (state, events)
- `useRouter` from `next/navigation` = Next.js way to navigate (NOT react-router's `useNavigate`)
- `router.push('/some-path')` = go to another page
- `useParams()` from `next/navigation` = get `[id]` from URL in dynamic routes
- Folder name `[id]` = dynamic segment, accessed via `const { id } = useParams()`

---

## How to Continue
1. Read this HANDOFF.md fully
2. Fix the bug in `app/Register/page.jsx` (navigate → router.push)
3. Build `app/profile/layout.jsx` first (Sidebar + Header) before any list pages
4. Follow the folder structure above for each entity
5. User is a beginner — explain everything with examples from this project
6. Practice files (JS/React learning exercises) are at:
   `C:\Training\POS\POS-Frontend\POS-FRONTEND\POS-FRONTEND\practice\`
   Resume from `js-basics/04-array-methods.js`
