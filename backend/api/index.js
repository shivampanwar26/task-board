const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const taskRoutes = require("../routes/taskRoutes");
const boardRoutes = require("../routes/boardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;

async function connectDB() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

// Connect to MongoDB BEFORE handling API routes
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({
            message: "MongoDB connection failed",
            error: error.message
        });
    }
});

app.get("/", (req, res) => {
    res.json({
        message: "Task Board API is running"
    });
});

app.use("/api/tasks", taskRoutes);
app.use("/api/boards", boardRoutes);

module.exports = app;