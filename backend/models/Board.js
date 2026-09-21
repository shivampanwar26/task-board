const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'Tasks to keep organised.'
    }
})

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;