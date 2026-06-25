// ============================================================
// LESSON 01: Ternary Operator  (? :)
// ============================================================
// HOW TO RUN:
//   Open browser → F12 → Console tab → paste ALL of this → Enter
// ============================================================

// ── WHAT IS IT? ──────────────────────────────────────────────
// A short way to write if/else in ONE line.
//
// Normal if/else:
//   if (condition) { doThis } else { doThat }
//
// Ternary:
//   condition ? doThis : doThat
//
// Read it as: "Is condition true? Yes → give first value. No → give second value."

// ── EXAMPLE 1: Basic ─────────────────────────────────────────
let age = 20;

// Old way
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

// Ternary way (same result)
let label = age >= 18 ? "Adult" : "Minor";
console.log(label); // → "Adult"

// ── EXAMPLE 2: Storing the result ────────────────────────────
let isLoggedIn = true;
let message = isLoggedIn ? "Welcome back!" : "Please login";
console.log(message); // → "Welcome back!"

isLoggedIn = false;
message = isLoggedIn ? "Welcome back!" : "Please login";
console.log(message); // → "Please login"

// ── EXAMPLE 3: Inside a string ───────────────────────────────
let score = 85;
console.log("You " + (score >= 50 ? "passed" : "failed")); // → "You passed"

// ── EXAMPLE 4: Nested ternary (used in your project) ─────────
// This is a ternary INSIDE a ternary
// Format: condition1 ? value1 : condition2 ? value2 : value3

let marks = 74;
let grade = marks >= 90 ? "A"
          : marks >= 75 ? "B"
          : marks >= 50 ? "C"
          : "F";
console.log(grade); // → "B"

// ── FROM YOUR PROJECT ─────────────────────────────────────────
// In buildPayload (CommonAddTemplate.jsx):
//
//   payload[field.key] = Array.isArray(payload[field.key])
//     ? payload[field.key]           ← if it IS an array, keep it
//     : payload[field.key]
//       ? [payload[field.key]]       ← if it has a value, wrap in array
//       : [];                        ← else give empty array
//
// In ListTemplate.jsx (status button):
//   className={item.status ? "bg-emerald-500" : "bg-rose-500"}
//   → if status is true → green button, else → red button
//
//   {item.status ? "Active" : "Inactive"}
//   → if status true → show "Active", else → "Inactive"

// ── YOUR TURN ─────────────────────────────────────────────────
// Try these exercises. Change the values and run again.

// Exercise 1: Write a ternary that checks if a number is positive or negative
let num = -5;
// your code here → should print "negative"

// Exercise 2: What will this print?
let status = true;
console.log(status ? "Active" : "Inactive"); // → ?

// Exercise 3: Nested - what will this print?
let stock = 0;
let stockLabel = stock > 10 ? "In Stock" : stock > 0 ? "Low Stock" : "Out of Stock";
console.log(stockLabel); // → ?
