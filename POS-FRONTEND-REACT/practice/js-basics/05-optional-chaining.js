// ============================================================
// LESSON 05: Optional Chaining (?.) and Nullish Coalescing (??)
// ============================================================
// HOW TO RUN:
//   Open browser → F12 → Console tab → paste ALL of this → Enter
// ============================================================

// ── PART A: Optional Chaining (?.) ───────────────────────────
// Safely access properties deep inside an object.
// If any part is null or undefined, it returns undefined instead of crashing.

// Problem WITHOUT ?.:
let user = null;
// console.log(user.name);  // ← CRASH: Cannot read property 'name' of null

// Solution WITH ?.:
console.log(user?.name);  // → undefined  (no crash!)

// Real example:
let userData = {
  name: "Shoaib",
  address: {
    city: "Hyderabad"
  }
};

console.log(userData.address.city);    // → "Hyderabad"
console.log(userData.phone?.number);   // → undefined (phone doesn't exist, no crash)
console.log(userData.address?.city);   // → "Hyderabad"

// With arrays:
let racksData = { shelf: ["Shelf 1", "Shelf 2"] };
let emptyRack = {};

console.log(racksData.shelf?.map(s => s)); // → ["Shelf 1", "Shelf 2"]
console.log(emptyRack.shelf?.map(s => s)); // → undefined (no crash!)

// ── FROM YOUR PROJECT ─────────────────────────────────────────
// In Profile.jsx:
//   {userData.roles?.join(', ') || 'Not available'}
//   → if roles exists, join them. If not → no crash, just undefined → fallback to 'Not available'

// In axiosInstance.js:
//   error.response?.status === 401
//   → if error.response exists, check status. If error.response is undefined → no crash

// In RacksList.jsx:
//   item.shelf?.map((shelf) => <span>{shelf}</span>)
//   → if shelf array exists, map over it. If null → no crash, just render nothing

// Simulation:
let apiError = { message: "Network error" }; // no response property
console.log(apiError.response?.status);  // → undefined (no crash)
console.log(apiError.response?.status === 401); // → false (undefined === 401 is false)

let apiError2 = { response: { status: 401 }, message: "Unauthorized" };
console.log(apiError2.response?.status);  // → 401
console.log(apiError2.response?.status === 401); // → true

// ── PART B: Nullish Coalescing (??) ──────────────────────────
// Returns the RIGHT side only if the LEFT side is null or undefined.
// Think: "use this value, OR if it's null/undefined, use the fallback"

let value1 = null ?? "default";
console.log(value1); // → "default"

let value2 = undefined ?? "default";
console.log(value2); // → "default"

let value3 = 0 ?? "default";
console.log(value3); // → 0  ← NOT "default" because 0 is not null/undefined

let value4 = "" ?? "default";
console.log(value4); // → ""  ← NOT "default" because "" is not null/undefined

let value5 = "hello" ?? "default";
console.log(value5); // → "hello"

// ── ?? vs || (important difference!) ────────────────────────
// || returns fallback for: null, undefined, 0, "", false (all falsy values)
// ?? returns fallback for: null, undefined ONLY

let count = 0;
console.log(count || 10);  // → 10  (because 0 is falsy)
console.log(count ?? 10);  // → 0   (because 0 is NOT null/undefined)

// ── FROM YOUR PROJECT ─────────────────────────────────────────
// In ListTemplate.jsx:
//   setTotalPages(responseData.totalPages ?? 0);
//   → if totalPages exists in response → use it. If null/undefined → use 0

//   const list = responseData.dtoList ?? responseData.content ?? responseData ?? [];
//   → try dtoList first, then content, then whole response, then empty array

// In CommonUpdateTemplate.jsx:
//   const data = response.data || {};
//   nextValues[field.key] = value ?? "";
//   → if value is null/undefined → use empty string

// Simulation:
let response1 = { dtoList: [1, 2, 3], totalPages: 2 };
let response2 = { content: [4, 5, 6] };
let response3 = {};

let list1 = response1.dtoList ?? response1.content ?? response1 ?? [];
let list2 = response2.dtoList ?? response2.content ?? response2 ?? [];
let list3 = response3.dtoList ?? response3.content ?? response3 ?? [];

console.log(list1); // → [1, 2, 3]
console.log(list2); // → [4, 5, 6]
console.log(list3); // → {}   (the whole empty response object)

// ── YOUR TURN ─────────────────────────────────────────────────

// Exercise 1: What will these print?
let product = { name: "Phone", brand: null };
console.log(product.brand?.toUpperCase()); // → ?
console.log(product.model?.price);         // → ?

// Exercise 2: What's the difference?
let qty = 0;
console.log(qty || "No quantity"); // → ?
console.log(qty ?? "No quantity"); // → ?

// Exercise 3: Fill in the blank
// let totalPages = responseData.totalPages ___ 0;
// → should use 0 if totalPages is null or undefined
