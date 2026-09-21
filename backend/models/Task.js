const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    icon: {
        type: String,
        default: "📚"
    },

    status: {
        type: String,
        enum: ["in-progress", "completed", "wont-do", "todo"],
        default: "todo"
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;