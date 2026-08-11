const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to TaskFlow API",
        status: "API is running"
    });
});

// Task API routes
app.use("/api/tasks", taskRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});