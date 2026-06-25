import { useState, useEffect } from "react";

// =============================================
// PART 1: useState
// useState lets you store and update values inside a component.
// Syntax: const [value, setValue] = useState(initialValue)
// =============================================

function CounterExample() {
    const [count, setCount] = useState(0); // count starts at 0

    return (
        <div style={{ border: "2px solid blue", padding: "16px", marginBottom: "16px", borderRadius: "8px" }}>
            <h2>useState Example - Counter</h2>
            <p>Count: <strong>{count}</strong></p>
            <button onClick={() => setCount(count + 1)}>Increase</button>
            <button onClick={() => setCount(count - 1)} style={{ marginLeft: "8px" }}>Decrease</button>
            <button onClick={() => setCount(0)} style={{ marginLeft: "8px" }}>Reset</button>
        </div>
    );
}

function InputExample() {
    const [name, setName] = useState(""); // empty string as initial value

    return (
        <div style={{ border: "2px solid green", padding: "16px", marginBottom: "16px", borderRadius: "8px" }}>
            <h2>useState Example - Input</h2>
            <input
                type="text"
                placeholder="Type your name..."
                value={name}
                onChange={(e) => setName(e.target.value)} // update state on every keystroke
            />
            {name && <p>Hello, <strong>{name}</strong>!</p>}
        </div>
    );
}

function ToggleExample() {
    const [isVisible, setIsVisible] = useState(false); // boolean state

    return (
        <div style={{ border: "2px solid orange", padding: "16px", marginBottom: "16px", borderRadius: "8px" }}>
            <h2>useState Example - Toggle</h2>
            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? "Hide Message" : "Show Message"}
            </button>
            {isVisible && <p style={{ marginTop: "8px" }}>You toggled me on!</p>}
        </div>
    );
}

// =============================================
// PART 2: useEffect
// useEffect runs code AFTER the component renders.
// Syntax: useEffect(() => { ...code... }, [dependencies])
//
// 3 ways to use it:
// 1. useEffect(() => {})           -- runs after EVERY render
// 2. useEffect(() => {}, [])       -- runs ONCE when component loads
// 3. useEffect(() => {}, [value])  -- runs when 'value' changes
// =============================================

function TimerExample() {
    const [seconds, setSeconds] = useState(0);

    // This runs once on mount, starts a timer every second
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1); // increment every second
        }, 1000);

        // Cleanup: stop the timer when component is removed
        return () => clearInterval(interval);
    }, []); // empty [] = run only once when component loads

    return (
        <div style={{ border: "2px solid red", padding: "16px", marginBottom: "16px", borderRadius: "8px" }}>
            <h2>useEffect Example - Timer (runs once on load)</h2>
            <p>Seconds since loaded: <strong>{seconds}</strong></p>
        </div>
    );
}

function WatchValueExample() {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("Click the button!");

    // This runs every time 'count' changes
    useEffect(() => {
        if (count === 0) {
            setMessage("Click the button!");
        } else if (count % 5 === 0) {
            setMessage(`Wow! You reached ${count}!`);
        } else {
            setMessage(`Count is now ${count}`);
        }
    }, [count]); // [count] = run this effect whenever count changes

    return (
        <div style={{ border: "2px solid purple", padding: "16px", marginBottom: "16px", borderRadius: "8px" }}>
            <h2>useEffect Example - Watch a value</h2>
            <p>{message}</p>
            <button onClick={() => setCount(count + 1)}>Click me ({count})</button>
        </div>
    );
}

// =============================================
// Main component that shows everything together
// =============================================

function HooksLearning() {
    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "16px" }}>
            <h1 style={{ textAlign: "center" }}>Learning useState & useEffect</h1>

            <h2 style={{ color: "blue" }}>--- useState Examples ---</h2>
            <CounterExample />
            <InputExample />
            <ToggleExample />

            <h2 style={{ color: "red" }}>--- useEffect Examples ---</h2>
            <TimerExample />
            <WatchValueExample />
        </div>
    );
}

export default HooksLearning;
