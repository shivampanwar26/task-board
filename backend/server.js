const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err)=> console.log(err));

const taskRoutes = require('./routes/taskRoutes');
const boardRoutes = require('./routes/boardRoutes');

app.use('/api/tasks', taskRoutes);
app.use('/api/boards', boardRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));