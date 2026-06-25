// ============================================================
// LESSON 02: Spread Operator (...)
// ============================================================
// HOW TO RUN:
//   Open browser → F12 → Console tab → paste ALL of this → Enter
// ============================================================

// ── WHAT IS IT? ──────────────────────────────────────────────
// The three dots "..." SPREAD (unpack) all items from an array or object.
// Think of it like opening a box and taking everything out.

// ── PART A: Spread with ARRAYS ───────────────────────────────

// Example 1: Combine two arrays
let fruits = ["apple", "banana"];
let veggies = ["carrot", "potato"];
let all = [...fruits, ...veggies];
console.log(all); // → ["apple", "banana", "carrot", "potato"]

// Example 2: Copy an array
let original = [1, 2, 3];
let copy = [...original];
copy.push(4);
console.log(original); // → [1, 2, 3]  ← NOT changed
console.log(copy);     // → [1, 2, 3, 4]

// Example 3: Add item to existing array
let numbers = [1, 2, 3];
let newNumbers = [...numbers, 4, 5];
console.log(newNumbers); // → [1, 2, 3, 4, 5]

// ── PART B: Spread with OBJECTS ──────────────────────────────
// This is what your project uses a LOT

// Example 4: Merge two objects
let person = { name: "Shoaib", age: 25 };
let job = { role: "Developer", company: "UST" };
let employee = { ...person, ...job };
console.log(employee);
// → { name: "Shoaib", age: 25, role: "Developer", company: "UST" }

// Example 5: Copy and add new field
let user = { username: "john@mail.com", name: "John" };
let updatedUser = { ...user, phoneNo: "9999999999" };
console.log(updatedUser);
// → { username: "john@mail.com", name: "John", phoneNo: "9999999999" }

// Example 6: Override a field
let defaultSettings = { color: "blue", size: 10, bold: false };
let mySettings = { ...defaultSettings, color: "red" }; // color gets overridden
console.log(mySettings);
// → { color: "red", size: 10, bold: false }

// ── FROM YOUR PROJECT ─────────────────────────────────────────
// In buildPayload (CommonAddTemplate.jsx):
//
//   const payload = {
//     identifier,              ← shorthand for identifier: identifier
//     ...(showDescription ? { description } : {}),  ← spread conditionally
//     ...values,               ← spread all form field values
//     ...extraData,            ← spread any extra fixed data
//   };
//
// Let's simulate this:

let identifier = "RACK-001";
let showDescription = false;
let description = "A rack";
let values = { shelf: "Shelf 1", status: true };
let extraData = {};

let payload = {
  identifier,
  ...(showDescription ? { description } : {}),  // showDescription is false → spread {} = nothing added
  ...values,
  ...extraData,
};
console.log(payload);
// → { identifier: "RACK-001", shelf: "Shelf 1", status: true }

// Now with showDescription = true:
showDescription = true;
let payload2 = {
  identifier,
  ...(showDescription ? { description } : {}),  // showDescription is true → adds description
  ...values,
  ...extraData,
};
console.log(payload2);
// → { identifier: "RACK-001", description: "A rack", shelf: "Shelf 1", status: true }

// ── In useState (React) ───────────────────────────────────────
// In CommonAddTemplate:
//   const handleChange = (key, value) => {
//     setValues((prev) => ({ ...prev, [key]: value }));
//   };
//
// This copies the previous values object and updates ONE key.
// Simulation:
let prevValues = { productName: "Phone", brand: "Apple" };
let updatedValues = { ...prevValues, brand: "Samsung" }; // only brand changes
console.log(updatedValues); // → { productName: "Phone", brand: "Samsung" }

// ── YOUR TURN ─────────────────────────────────────────────────

// Exercise 1: Merge these two objects into one
let address = { city: "Hyderabad", state: "Telangana" };
let contact = { email: "test@mail.com", phone: "9876543210" };
// let fullContact = ...  → merge them

// Exercise 2: What will this print?
let a = { x: 1, y: 2 };
let b = { y: 10, z: 3 };
let c = { ...a, ...b };
console.log(c); // → ?  (hint: y gets overridden)

// Exercise 3: Add item 4 to this array using spread (don't use push)
let arr = [1, 2, 3];
// let newArr = ...
let newArr = [...arr, 4];
console.log(newArr); // → [1, 2, 3, 4]