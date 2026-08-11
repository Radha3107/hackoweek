const express = require("express");
const tasks = require("../data/tasks");

const router = express.Router();

// Get all tasks
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });
});

// Get a single task by ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    res.status(200).json({
        success: true,
        data: task
    });
});

// Create a new task
router.post("/", (req, res) => {
    const { title, description, status } = req.body;

    // Validate required fields
    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: "Title and description are required"
        });
    }

    // Create new task
    const newTask = {
        id: tasks.length + 1,
        title: title,
        description: description,
        status: status || "pending"
    };

    // Add task to the array
    tasks.push(newTask);

    res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: newTask
    });
});

// Update an existing task
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    // Check if task exists
    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    const { title, description, status } = req.body;

    // Validate required fields
    if (!title || !description || !status) {
        return res.status(400).json({
            success: false,
            message: "Title, description and status are required"
        });
    }

    // Update task
    task.title = title;
    task.description = description;
    task.status = status;

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: task
    });
});

// Delete a task
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === id);

    // Check if task exists
    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    // Remove the task
    const deletedTask = tasks.splice(taskIndex, 1);

    res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: deletedTask[0]
    });
});
module.exports = router;