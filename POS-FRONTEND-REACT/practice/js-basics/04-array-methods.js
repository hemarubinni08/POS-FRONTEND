// ============================================================
// LESSON 04: Array Methods — map, forEach, filter, Array.isArray
// ============================================================
// HOW TO RUN:
//   Open browser → F12 → Console tab → paste ALL of this → Enter
// ============================================================

// ── WHAT ARE THEY? ───────────────────────────────────────────
// Arrays have built-in functions (methods) to work with their items.
// You already know .map() — let's go deeper and add the rest.

// ── PART A: .map() ───────────────────────────────────────────
// Takes each item, transforms it, returns a NEW array.
// Original array is NOT changed.

let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(num => num * 2);
console.log(doubled);  // → [2, 4, 6, 8, 10]
console.log(numbers);  // → [1, 2, 3, 4, 5]  ← not changed

// Map with objects (EXACTLY like your project):
let brands = [
  { identifier: "APPLE", status: true },
  { identifier: "SAMSUNG", status: false },
  { identifier: "NOKIA", status: true },
];

// Turn each brand into just its identifier:
let brandNames = brands.map(brand => brand.identifier);
console.log(brandNames); // → ["APPLE", "SAMSUNG", "NOKIA"]

// In your project (DropdownTemplate.jsx):
// list.map((item) => ({
//   value: item.identifier ?? item.id ?? item.name,
//   label: item.name ?? item.identifier ?? item.id,
// }))
// → Converts API response items into dropdown option objects

let apiItems = [
  { identifier: "Shelf1", name: null },
  { identifier: "Shelf2", name: "Shelf 2" },
];
let options = apiItems.map(item => ({
  value: item.identifier,
  label: item.name ?? item.identifier  // if name is null, use identifier
}));
console.log(options);
// → [{ value: "Shelf1", label: "Shelf1" }, { value: "Shelf2", label: "Shelf 2" }]

// ── PART B: .forEach() ───────────────────────────────────────
// Loops through each item and runs code.
// DOES NOT return a new array (unlike map).
// Use it when you want to DO something, not create something.

let users = ["Alice", "Bob", "Charlie"];
users.forEach(user => {
  console.log("Hello, " + user);
});
// → "Hello, Alice"
// → "Hello, Bob"
// → "Hello, Charlie"

// In your project (buildPayload in CommonAddTemplate.jsx):
// extraFields.forEach((field) => {
//   if (field.asArray) {
//     payload[field.key] = ...
//   }
//   if (field.valueType === "boolean") {
//     payload[field.key] = ...
//   }
// });
// → Loops through each field config and MODIFIES the payload object

// Simulation:
let extraFields = [
  { key: "status", valueType: "boolean" },
  { key: "shelf", asArray: true },
];
let myPayload = { status: "true", shelf: "Shelf1" };

extraFields.forEach(field => {
  if (field.asArray) {
    myPayload[field.key] = [myPayload[field.key]]; // wrap in array
  }
  if (field.valueType === "boolean") {
    myPayload[field.key] = myPayload[field.key] === "true"; // convert to real boolean
  }
});
console.log(myPayload);
// → { status: true, shelf: ["Shelf1"] }

// ── PART C: .filter() ────────────────────────────────────────
// Returns a NEW array with only items that pass a condition.

let products = [
  { name: "Phone", status: true },
  { name: "Laptop", status: false },
  { name: "Tablet", status: true },
];
let activeProducts = products.filter(p => p.status === true);
console.log(activeProducts);
// → [{ name: "Phone", status: true }, { name: "Tablet", status: true }]

// ── PART D: Array.isArray() ──────────────────────────────────
// Checks if a value IS an array. Returns true or false.

console.log(Array.isArray([1, 2, 3]));     // → true
console.log(Array.isArray("hello"));       // → false
console.log(Array.isArray({ a: 1 }));      // → false
console.log(Array.isArray([]));            // → true (empty array is still array)
console.log(Array.isArray(undefined));     // → false
console.log(Array.isArray(null));          // → false

// In your project (buildPayload):
// Array.isArray(payload[field.key])
//   ? payload[field.key]           ← already an array, keep it
//   : payload[field.key]
//     ? [payload[field.key]]       ← single value, wrap in array
//     : []                         ← nothing, use empty array

// Simulation:
function ensureArray(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}
console.log(ensureArray(["Shelf1", "Shelf2"])); // → ["Shelf1", "Shelf2"]
console.log(ensureArray("Shelf1"));             // → ["Shelf1"]
console.log(ensureArray(undefined));            // → []
console.log(ensureArray(""));                   // → []

// ── YOUR TURN ─────────────────────────────────────────────────

// Exercise 1: Use .map() to get all identifiers from this array
let racks = [
  { id: 1, identifier: "Rack A" },
  { id: 2, identifier: "Rack B" },
  { id: 3, identifier: "Rack C" },
];
// let identifiers = racks.map(...)
// console.log(identifiers); // → ["Rack A", "Rack B", "Rack C"]

// Exercise 2: Use .filter() to get only active racks
let racksData = [
  { id: 1, identifier: "Rack A", status: true },
  { id: 2, identifier: "Rack B", status: false },
  { id: 3, identifier: "Rack C", status: true },
];
// let activeRacks = racksData.filter(...)
// console.log(activeRacks); // → Rack A and Rack C

// Exercise 3: What does Array.isArray return for each?
console.log(Array.isArray(["a", "b"])); // → ?
console.log(Array.isArray("a"));        // → ?
console.log(Array.isArray(42));         // → ?
