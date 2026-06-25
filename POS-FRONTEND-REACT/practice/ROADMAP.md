# Learning Roadmap — React for POS Project

## How to Practice

### JS Files (.js)
1. Open your browser
2. Press F12 → click "Console" tab
3. Copy the ENTIRE file content → paste → press Enter
4. Read the output, change values, experiment

### React Files (.html)
1. Just double-click the file → opens in browser
2. Read the code on the left, see the output on the right

---

## PHASE 1 — JavaScript Basics (js-basics folder)
These are the JS concepts used inside your project code.

| File | Concept | Where used in project |
|------|---------|----------------------|
| 01-ternary.js | `condition ? a : b` | buildPayload, JSX rendering |
| 02-spread.js | `...` operator | buildPayload merging objects |
| 03-destructuring.js | `{ name, age }` from objects | Every component's props |
| 04-array-methods.js | map, forEach, filter, Array.isArray | Lists, buildPayload |
| 05-optional-chaining.js | `?.` and `??` | API responses, axiosInstance |
| 06-short-circuit.js | `&&` `\|\|` logic | Conditional rendering |
| 07-object-bracket.js | `obj[key]` | buildPayload field[key] |

## PHASE 2 — React Basics (react-basics folder)
Open each HTML file by double-clicking.

| File | Concept | Where used in project |
|------|---------|----------------------|
| 08-component.html | What is a Component | Every .jsx file |
| 09-props.html | Passing data to components | Layout, ListTemplate |
| 10-useState.html | Managing state | Every form, loading, data |
| 11-useEffect.html | Running code on load | Fetching data in Profile, Sidebar |
| 12-events.html | onClick, onChange, onSubmit | All buttons and inputs |
| 13-conditional.html | Show/hide based on condition | Loading states, error messages |
| 14-lists.html | Rendering arrays with .map | Table rows, sidebar menu |

## PHASE 3 — Project Patterns (react-patterns folder)
| File | Concept | Where used in project |
|------|---------|----------------------|
| 15-forms.html | Controlled forms | UserAdd, UserUpdate, Login |
| 16-async-api.html | async/await + axios | Every API call |
| 17-reusable.html | Reusable component pattern | CommonAddTemplate, ListTemplate |
| 18-router.html | useNavigate, useParams | All edit pages, navigation |

---

## Start here → js-basics/01-ternary.js
