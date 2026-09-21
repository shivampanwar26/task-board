const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

// router.get("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const task = await Task.findById(id);
//         res.json(task);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }  
// });

router.post("/", async (req, res) => {
    try {
        const { boardId, name, description, icon, status } = req.body;
        const task = await Task.create({ boardId, name, description, icon, status });
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { boardId, name, description, icon, status } = req.body;
        const task = await Task.findByIdAndUpdate(id, { boardId, name, description, icon, status }, { new: true });
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;