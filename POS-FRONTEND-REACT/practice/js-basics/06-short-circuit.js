// ============================================================
// LESSON 06: Short Circuit Evaluation (&&, ||)
// ============================================================
// HOW TO RUN:
//   Open browser → F12 → Console tab → paste ALL of this → Enter
// ============================================================

// ── WHAT IS IT? ──────────────────────────────────────────────
// && and || don't just work with true/false.
// They STOP (short-circuit) as soon as they know the answer,
// and return the VALUE that made them stop.

// ── PART A: && (AND) ─────────────────────────────────────────
// Returns the FIRST falsy value, or the LAST value if all are truthy.
// Short circuits: if the first part is false, it STOPS, doesn't check the rest.

console.log(true && "hello");   // → "hello"   (true is truthy, returns last value)
console.log(false && "hello");  // → false     (false is falsy, stops here)
console.log(0 && "hello");      // → 0         (0 is falsy, stops here)
console.log("" && "hello");     // → ""        (empty string is falsy, stops here)
console.log("world" && "hello");// → "hello"   (both truthy, returns last)
console.log(null && "hello");   // → null      (null is falsy, stops here)

// In REACT - && is used to CONDITIONALLY render things:
// {isLoading && <p>Loading...</p>}
// → If isLoading is true  → renders <p>Loading...</p>
// → If isLoading is false → renders nothing (false is not shown in JSX)

// Simulation (without JSX):
let isLoading = true;
let showData = !isLoading;

console.log(isLoading && "Loading...");  // → "Loading..." (shown)
console.log(showData && "Data shown!");  // → false (not shown)

isLoading = false;
console.log(isLoading && "Loading...");  // → false (nothing shown)

// ── FROM YOUR PROJECT (&&) ────────────────────────────────────
// In ListTemplate.jsx:
//   {loading && (<div>Loading records...</div>)}
//   → if loading is true → show the loading div
//
//   {!loading && data.length === 0 && (<div>No records available.</div>)}
//   → if NOT loading AND data is empty → show "no records"
//
//   {!loading && data.length > 0 && (<table>...</table>)}
//   → if NOT loading AND there IS data → show the table

// Simulation:
let loading = false;
let data = [];

let result1 = loading && "Show Loading";
let result2 = !loading && data.length === 0 && "No Records";
let result3 = !loading && data.length > 0 && "Show Table";

console.log(result1); // → false
console.log(result2); // → "No Records"
console.log(result3); // → false

data = [{ id: 1 }, { id: 2 }];
let result4 = !loading && data.length > 0 && "Show Table";
console.log(result4); // → "Show Table"

// ── PART B: || (OR) ──────────────────────────────────────────
// Returns the FIRST truthy value, or the LAST value if all are falsy.

console.log("hello" || "world"); // → "hello"  (first is truthy, stops)
console.log(null || "world");    // → "world"  (null is falsy, checks next)
console.log(false || 0 || "");  // → ""       (all falsy, returns last)
console.log(false || "found");  // → "found"  (false is falsy, returns next)

// Used as FALLBACK:
let username = null;
console.log(username || "Guest");  // → "Guest"

username = "Shoaib";
console.log(username || "Guest");  // → "Shoaib"

// ── FROM YOUR PROJECT (||) ────────────────────────────────────
// In Header.jsx:
//   const username = localStorage.getItem('username') || '';
//   → if localStorage has username → use it. If null → use empty string

// In Profile.jsx:
//   {userData.name || 'Not available'}
//   → if name exists → show it. If empty/null → show 'Not available'

// In axiosInstance.js:
//   error.response?.data?.message || error.message || 'Unknown error'
//   → try first, then second, then third as fallback

// Simulation:
let errorResponse = { data: { message: "Invalid credentials" } };
let errorMessage = errorResponse?.data?.message || errorResponse?.message || "Unknown error";
console.log(errorMessage); // → "Invalid credentials"

let errorResponse2 = {};
let errorMessage2 = errorResponse2?.data?.message || errorResponse2?.message || "Unknown error";
console.log(errorMessage2); // → "Unknown error"

// ── YOUR TURN ─────────────────────────────────────────────────

// Exercise 1: What will these print?
console.log(1 && 2 && 3);       // → ?
console.log(1 && null && 3);    // → ?
console.log(false || null || "hello" || "world"); // → ?

// Exercise 2: isLoggedIn is false. What renders?
let isLoggedIn = false;
let userName = "Shoaib";
console.log(isLoggedIn && "Show Dashboard"); // → ?
console.log(userName || "Guest");            // → ?

// Exercise 3: Simulate Profile.jsx behavior
let profile = { name: "", phoneNo: null, roles: [] };
console.log(profile.name || "Not available");         // → ?
console.log(profile.phoneNo || "Not available");      // → ?
console.log(profile.roles?.join(", ") || "No roles"); // → ?
