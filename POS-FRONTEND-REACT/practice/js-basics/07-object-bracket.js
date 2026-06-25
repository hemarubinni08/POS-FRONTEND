// ============================================================
// LESSON 07: Object Bracket Notation — obj[key]
// ============================================================
// HOW TO RUN:
//   Open browser → F12 → Console tab → paste ALL of this → Enter
// ============================================================

// ── WHAT IS IT? ──────────────────────────────────────────────
// Two ways to access object properties:
//   obj.name       → DOT notation   (you type the key name directly)
//   obj["name"]    → BRACKET notation (key is a string)
//   obj[variable]  → BRACKET with variable (key comes from a variable!)

// ── EXAMPLE 1: Basic ─────────────────────────────────────────
let user = { name: "Shoaib", age: 25, city: "Hyderabad" };

// Dot notation:
console.log(user.name);  // → "Shoaib"
console.log(user.age);   // → 25

// Bracket notation (same result):
console.log(user["name"]); // → "Shoaib"
console.log(user["age"]);  // → 25

// ── EXAMPLE 2: Key from a variable (THE POWERFUL PART) ───────
let field = "name";
console.log(user[field]); // → "Shoaib"  (same as user.name)

field = "city";
console.log(user[field]); // → "Hyderabad"

// This is IMPOSSIBLE with dot notation:
// console.log(user.field); // → undefined! (looks for key literally named "field")

// ── EXAMPLE 3: Setting values dynamically ────────────────────
let payload = {};
let key1 = "identifier";
let key2 = "status";

payload[key1] = "RACK-001";
payload[key2] = true;
console.log(payload); // → { identifier: "RACK-001", status: true }

// In one line with computed property (same thing):
let dynamicKey = "productName";
let obj = {
  [dynamicKey]: "Phone"  // ← [variable] inside {} creates dynamic key
};
console.log(obj); // → { productName: "Phone" }

// ── FROM YOUR PROJECT ─────────────────────────────────────────
// This is used HEAVILY in CommonAddTemplate and CommonUpdateTemplate.

// 1. handleChange function:
//   const handleChange = (key, value) => {
//     setValues((prev) => ({ ...prev, [key]: value }));
//   };
//
// When user types in "productName" field:
//   handleChange("productName", "iPhone")
//   → setValues({ ...prev, productName: "iPhone" })
//
// When user types in "brand" field:
//   handleChange("brand", "Apple")
//   → setValues({ ...prev, brand: "Apple" })

// Simulation:
let values = {};
function handleChange(key, value) {
  values = { ...values, [key]: value };
}
handleChange("productName", "iPhone");
console.log(values); // → { productName: "iPhone" }
handleChange("brand", "Apple");
console.log(values); // → { productName: "iPhone", brand: "Apple" }
handleChange("productName", "Galaxy"); // update existing
console.log(values); // → { productName: "Galaxy", brand: "Apple" }

// 2. In buildPayload forEach:
//   extraFields.forEach((field) => {
//     if (field.asArray) {
//       payload[field.key] = ...  ← read/write using dynamic key
//     }
//   });

// Simulation:
let extraFields = [
  { key: "shelf", asArray: true },
  { key: "status", valueType: "boolean" }
];
let myPayload = { identifier: "RACK-001", shelf: "Shelf A", status: "true" };

extraFields.forEach(field => {
  console.log("Processing field:", field.key);
  console.log("Current value:", myPayload[field.key]); // bracket read

  if (field.asArray) {
    myPayload[field.key] = [myPayload[field.key]]; // bracket write
  }
  if (field.valueType === "boolean") {
    myPayload[field.key] = myPayload[field.key] === "true"; // bracket read + write
  }
});
console.log(myPayload);
// → { identifier: "RACK-001", shelf: ["Shelf A"], status: true }

// 3. In CommonUpdateTemplate:
//   params: { [recordParam]: recordId }
//   → if recordParam = "id" and recordId = "5"
//   → this creates: { id: "5" }

let recordParam = "id";
let recordId = "5";
let params = { [recordParam]: recordId };
console.log(params); // → { id: "5" }

recordParam = "identifier";
recordId = "BRAND-001";
let params2 = { [recordParam]: recordId };
console.log(params2); // → { identifier: "BRAND-001" }

// ── YOUR TURN ─────────────────────────────────────────────────

// Exercise 1: Access "status" using a variable
let rack = { id: 1, identifier: "Rack A", status: true };
let fieldName = "status";
// console.log(rack[fieldName]); // → ?

// Exercise 2: Add a dynamic key to this object
let data = { page: 0, sizePerPage: 10 };
let sortKey = "sortField";
// data[sortKey] = "identifier";
// console.log(data); // → { page: 0, sizePerPage: 10, sortField: "identifier" }

// Exercise 3: Simulate handleChange — what does values look like after these calls?
let formValues = {};
function simulateChange(key, val) {
  formValues = { ...formValues, [key]: val };
}
simulateChange("username", "test@mail.com");
simulateChange("password", "secret123");
simulateChange("username", "new@mail.com"); // update
console.log(formValues); // → ?
