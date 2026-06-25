// ============================================================
// LESSON 03: Destructuring
// ============================================================
// HOW TO RUN:
//   Open browser → F12 → Console tab → paste ALL of this → Enter
// ============================================================

// ── WHAT IS IT? ──────────────────────────────────────────────
// Destructuring lets you PULL OUT values from objects or arrays
// into individual variables in ONE line.

// ── PART A: Object Destructuring ─────────────────────────────

// Without destructuring (old way):
let user = { name: "Shoaib", age: 25, city: "Hyderabad" };
let name1 = user.name;
let age1 = user.age;
console.log(name1, age1); // → "Shoaib" 25

// With destructuring (new way):
let { name, age, city } = user;
console.log(name, age, city); // → "Shoaib" 25 "Hyderabad"

// Example: Pick only what you need
let { name: userName } = user; // rename: name → userName
console.log(userName); // → "Shoaib"

// Default value if field doesn't exist
let { country = "India" } = user;
console.log(country); // → "India" (because user has no country field)

// ── PART B: Array Destructuring ──────────────────────────────

let colors = ["red", "green", "blue"];
let [first, second, third] = colors;
console.log(first);  // → "red"
console.log(second); // → "green"
console.log(third);  // → "blue"

// Skip items with comma
let [,, lastColor] = colors;
console.log(lastColor); // → "blue"

// ── FROM YOUR PROJECT ─────────────────────────────────────────

// 1. In EVERY component — destructuring PROPS:
//
//   function CommonAddTemplate({ title, apiPath, extraFields, onSuccessPath, showDescription }) {
//
// This means: when someone passes these to CommonAddTemplate,
// pull them out automatically. Same as:
//   const title = props.title;
//   const apiPath = props.apiPath;
//   ... etc

// 2. In useParams (React Router):
//   const { identifier } = useParams();
//   const { id } = useParams();
//
// useParams() returns an object like { id: "5" }
// Destructuring pulls out just "id"

// Let's simulate:
function getParams() {
  return { id: "5", type: "racks" }; // imagine this is useParams()
}
let { id, type } = getParams();
console.log(id);   // → "5"
console.log(type); // → "racks"

// 3. In useState (React):
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//
// useState returns an ARRAY of 2 items: [currentValue, setterFunction]
// Array destructuring gives each a name.

// Simulate useState:
function useState(initial) {
  return [initial, function setter(val) { console.log("Set to:", val); }];
}
let [data, setData] = useState([]);
let [loading, setLoading] = useState(true);
console.log(data);    // → []
console.log(loading); // → true
setData(["item1"]);   // → "Set to: ['item1']"

// 4. In DropdownTemplate.jsx:
//   const [apiOptions, setApiOptions] = useState([]);
//   const [loading, setLoading] = useState(Boolean(apiPath || apiEndpoint));

// ── YOUR TURN ─────────────────────────────────────────────────

// Exercise 1: Destructure this object to get brand and model
let product = { id: 1, productName: "Phone", brand: "Samsung", model: "Galaxy" };
// let { ... } = product;
// console.log(brand, model);

// Exercise 2: What will this print?
let rack = { id: 5, identifier: "Rack 1", shelf: ["Shelf A", "Shelf B"], status: true };
let { identifier: rackName, status } = rack;
console.log(rackName); // → ?
console.log(status);   // → ?

// Exercise 3: Destructure this array
let pagination = [0, 5, 100]; // [currentPage, sizePerPage, totalRecords]
let [page, size, total] = pagination;
console.log(page, size, total); // → ?
