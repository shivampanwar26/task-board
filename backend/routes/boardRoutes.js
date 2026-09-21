const express = require("express");

const router = express.Router();

const Board = require("../models/Board");
const Task = require("../models/Task");

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const board = await Board.findById(id);

        if (!board) {
            return res.status(404).json({
                message: "Board not found"
            });
        }

        const tasks = await Task.find({
            boardId: id
        });

        res.json({
            board,
            tasks
        });

    } catch (err) {
        console.error("GET BOARD ERROR:", err);

        res.status(500).json({
            message: err.message
        });
    }
});


router.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;

        const board = await Board.create({
            name,
            description
        });

        const tasks = await Task.insertMany([
            {
                boardId: board._id,
                name: "Task in Progress",
                icon: "⏰",
                status: "in-progress"
            },
            {
                boardId: board._id,
                name: "Task Completed",
                icon: "✅",
                status: "completed"
            },
            {
                boardId: board._id,
                name: "Task Won't Do",
                icon: "❌",
                status: "wont-do"
            },
            {
                boardId: board._id,
                name: "Task To Do",
                icon: "📚",
                status: "todo"
            }
        ]);

        res.status(201).json({
            board,
            tasks
        });

    } catch (err) {
        console.error("CREATE BOARD ERROR:", err);

        res.status(400).json({
            message: err.message
        });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const board = await Board.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );

        res.json(board);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const board = await Board.findByIdAndDelete(id);

        await Task.deleteMany({
            boardId: id
        });

        res.json(board);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});


module.exports = router;