function Shoaib({username, title, name, message }) {
    return (
        <div className="p-4" style={{ backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
            <h1>Hello, {username}!</h1>
            <h1>Component Made by me</h1>
            <p>I ma using props here {title}</p>
            <p>Name: {name}</p>
            <p>Message: {message}</p>

        </div>
    );
}

export default Shoaib;  
