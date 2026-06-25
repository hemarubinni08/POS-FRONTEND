# SESSION HANDOFF — POS Frontend

## Who is the user?
- Name: Shoaib Ejaz
- Git user: Shoaib Ejaz
- Email: asadchamp109@gmail.com
- Branch: `feature/sprint3_pod1_Shoaib`
- Knowledge level: Very beginner in JS/React — knows variables, functions, map basics only
- Project was built using AI — user is now learning to understand and debug it themselves

---

## Project Structure

### Location
```
c:\Training\POS\POS-Frontend\POS-FRONTEND\POS-FRONTEND\
```
(Note: double POS-FRONTEND in path — the app lives in the inner folder)

### Tech Stack
- React 18 + Vite
- Tailwind CSS
- Axios for API calls
- React Router DOM
- Backend: Spring Boot at `http://localhost:8080/api`
- Auth: JWT token stored in `localStorage`

### Key Files
```
src/
├── App.jsx                          ← all routes defined here
├── api/axiosInstance.js             ← axios with JWT interceptor, base URL
├── Component/
│   ├── Layout.jsx                   ← Sidebar + Header + Footer wrapper
│   ├── Sidebar.jsx                  ← fetches nodes from /node/nodeForRole
│   ├── Header.jsx                   ← shows username from localStorage
│   ├── Footer.jsx
│   ├── ListTemplate.jsx             ← reusable paginated table (CRUD)
│   ├── CommonAddTemplate.jsx        ← reusable add form
│   ├── CommonUpdateTemplate.jsx     ← reusable update form with prefill
│   └── Dropdown/
│       ├── DropdownTemplate.jsx     ← single/multi select, API or static options
│       ├── SingleSelectDropdown.jsx ← wraps DropdownTemplate (multiple=false)
│       └── MultiSelectDropdown.jsx  ← wraps DropdownTemplate (multiple=true)
├── Pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   ├── Brand/    BrandList, BrandAdd, BrandUpdate
│   ├── Shelf/    ShelfList, ShelfAdd, ShelfUpdate
│   ├── Racks/    RacksList, RacksAdd, RacksUpdate
│   ├── Model/    ModelList, ModelAdd, ModelUpdate
│   ├── Product/  ProductList, ProductAdd, ProductUpdate
│   ├── User/     UserList, UserAdd, UserUpdate
│   └── Category/ CategoryList, CategoryAdd, CategoryUpdate  ← ADDED THIS SESSION
```

---

## What Was Done This Session

### 1. Pagination bug fixed
- **Problem:** Next button always disabled
- **Root cause 1:** `pageSize` not passed to `ListTemplate` → `sizePerPage` sent as undefined → axios drops it → backend uses default 50 → all records on 1 page → `totalPages=1`
- **Root cause 2:** Racks backend was returning plain `List<RacksDto>` array instead of `WsDto` wrapper → `totalPages` missing from response → frontend defaulted to 0
- **Fix:** Added `pageSize={2}` to RacksList, user restarted backend with proper WsDto return

### 2. Category pages created (NEW)
Files created:
- `src/Pages/Category/CategoryList.jsx` — columns: ID, Identifier, Supercategory, Status
- `src/Pages/Category/CategoryAdd.jsx` — supercategory dropdown from `/category/list`, status boolean
- `src/Pages/Category/CategoryUpdate.jsx` — uses `id` as recordParam
- `src/App.jsx` — added 3 routes: `/profile/category`, `/profile/category/add`, `/profile/category/edit/:id`

**Important:** Supercategory dropdown uses `apiPath: "category"` (POST to `/category/list`) NOT `apiEndpoint: "/category/findAllActive"` (that endpoint doesn't exist)

### 3. Practice folder created (for learning)
Location: `c:\Training\POS\POS-Frontend\POS-FRONTEND\practice\`
(OUTSIDE the app — zero effect on project)

```
practice/
├── ROADMAP.md
├── js-basics/          ← paste in browser console (F12 → Console)
│   ├── 01-ternary.js        ✅ user practiced this
│   ├── 02-spread.js         ✅ user practiced this
│   ├── 03-destructuring.js
│   ├── 04-array-methods.js  ✅ user was reading this
│   ├── 05-optional-chaining.js
│   ├── 06-short-circuit.js
│   └── 07-object-bracket.js
├── react-basics/       ← double-click HTML to open in browser
│   ├── 08-component.html
│   ├── 09-props.html
│   ├── 10-useState.html
│   ├── 11-useEffect.html
│   ├── 12-events.html
│   ├── 13-conditional.html
│   └── 14-lists.html
└── react-patterns/
    ├── 15-forms.html
    ├── 16-async-api.html
    ├── 17-reusable.html
    └── 18-router.html
```

User's learning progress:
- ✅ 01-ternary.js — understood, practiced, changed `marks = 74` to test nested ternary
- ✅ 02-spread.js — understood, completed Exercise 3
- 🔄 04-array-methods.js — was reading this when session ended
- ❌ 03, 05-18 — not done yet

---

## Key Concepts Explained This Session

### buildPayload in CommonAddTemplate.jsx
```js
const buildPayload = () => {
  const payload = {
    identifier,
    ...(showDescription ? { description } : {}),  // spread conditionally
    ...values,    // all form field values
    ...extraData, // any extra fixed data
  };

  extraFields.forEach((field) => {
    if (field.asArray) {
      payload[field.key] = Array.isArray(payload[field.key])
        ? payload[field.key]           // already array → keep
        : payload[field.key]
          ? [payload[field.key]]       // single value → wrap in array
          : [];                        // nothing → empty array
    }
    if (field.valueType === "boolean") {
      payload[field.key] = payload[field.key] === true || payload[field.key] === "true";
    }
  });
  return payload;
};
```

### render: (item) => in columns
```js
// Simple column — uses field name directly
{ label: "ID", field: "id" }  // → item["id"]

// Custom column — render function for complex display (e.g., array as badges)
{
  label: "Shelf",
  render: (item) => item.shelf?.map(shelf => <span key={shelf}>{shelf}</span>)
}
// Used because shelf is an ARRAY ["Shelf 1", "Shelf 2"]
// ListTemplate calls: col.render ? col.render(item) : item[col.field]
```

### ?? vs || vs ?.
- `??` = fallback only for null/undefined → `item.identifier ?? item.id ?? item.name`
- `||` = fallback for all falsy (null, undefined, 0, "", false)
- `?.` = safe access → `item.shelf?.map(...)` — no crash if shelf is null

### Why /findAllActive exists (not replaceable with frontend .filter())
- Backend filters in DB query → only sends active records → fast
- Frontend filter requires fetching ALL records first → slow for large datasets
- Pagination breaks if filtering after fetching paginated results

---

## Pending / To Continue

### Learning (next lessons to do in order):
1. `practice/js-basics/04-array-methods.js` — resume here (was mid-lesson)
2. `practice/js-basics/05-optional-chaining.js`
3. `practice/js-basics/06-short-circuit.js`
4. `practice/js-basics/07-object-bracket.js`
5. Then React basics: `08-component.html` through `18-router.html`

### Project work (nothing explicitly pending — ask user what's next)
- Category pages were just added — may need testing
- ModelUpdate route in App.jsx uses `<ModelAdd />` instead of `<ModelUpdate />` (line 50) — possible bug to fix

---

## How to Continue

Tell the new Claude:
1. Read ALL files in `src/` (App.jsx, all Pages, all Components, api/axiosInstance.js)
2. Read this HANDOFF.md
3. User is a beginner — explain things simply with real examples from the project
4. Practice files are in `c:\Training\POS\POS-Frontend\POS-FRONTEND\practice\`
5. Continue learning from `04-array-methods.js` in practice folder
6. Never just give explanations — always show hands-on examples tied to actual project code
