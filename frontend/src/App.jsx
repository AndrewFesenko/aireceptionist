function App() {
    return (
        <div style={{ textAlign: "center", padding: "3rem" }}>
            <h1>AI Receptionist</h1>
            <p>Connect your calendar to get started</p>
            <div style={{ marginTop: "2rem" }}>
                <a href="http://localhost:4000/auth/google">
                    <button>Connect Google Calendar</button>
                </a>
                <a href="http://localhost:4000/auth/microsoft" style={{ marginLeft: "1rem" }}>
                    <button>Connect Microsoft Calendar</button>
                </a>
            </div>
        </div>
    );
}

export default App;
