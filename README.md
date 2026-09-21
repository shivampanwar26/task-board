# My Task Board

A full-stack task management application built with **React, Node.js, Express, and MongoDB**. Users can create independent task boards, manage tasks, edit task details, update statuses, and delete tasks.

## Features

- Create a new task board
- Unique URL for every board
- Edit board name and description
- Create tasks with default values
- Edit task name, description, icon, and status
- Delete tasks
- Four task statuses:
  - 🕐 In Progress
  - ✓ Completed
  - × Won't Do
  - 📝 To Do
- Status-based task card colors
- Responsive UI
- REST API backend
- MongoDB database
- Separate frontend and backend
- Production backend deployed on Vercel

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Vite
- CSS

### Backend

- Node.js
- Express.js
- Mongoose
- MongoDB
- CORS

### Deployment

- Frontend: Netlify
- Backend: Vercel
- Database: MongoDB Atlas

## Project Structure

```text
my-task-board/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Board.jsx
│   │   ├── resources/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── ...
├── backend/
│   ├── api/
│   │   └── index.js
│   ├── models/
│   │   ├── Board.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── boardRoutes.js
│   │   └── taskRoutes.js
│   ├── vercel.json
│   ├── package.json
│   └── .env
└── README.md
```

## Database Design

The application uses two MongoDB collections.

### Board

```text
Board
├── _id
├── name
└── description
```

### Task

```text
Task
├── _id
├── boardId
├── name
├── description
├── icon
└── status
```

Each task contains a `boardId` that references its parent board.

## API Endpoints

### Boards

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/boards/:id` | Get board and its tasks |
| POST | `/api/boards` | Create a new board |
| PUT | `/api/boards/:id` | Update board |
| DELETE | `/api/boards/:id` | Delete board and its tasks |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Environment Variables

### Frontend

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:3000
```

For production:

```env
VITE_API_URL=https://your-vercel-backend-url.vercel.app
```

### Backend

For local MongoDB:

```env
MONGO_URL=mongodb://localhost:27017/tasks
```

For MongoDB Atlas:

```env
MONGO_URL=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/tasks
```

**Never commit `.env` files or database credentials to GitHub.**

## Running Locally

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/my-task-board.git
cd my-task-board
```

### Backend

```bash
cd backend
npm install
npm run start
```

The backend runs on:

```text
http://localhost:3000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## Production Architecture

```text
                    ┌─────────────────┐
                    │     Browser     │
                    │  React Frontend │
                    └────────┬────────┘
                             │
                             │ REST API
                             ▼
                    ┌─────────────────┐
                    │     Vercel      │
                    │ Express Backend  │
                    └────────┬────────┘
                             │
                             │ Mongoose
                             ▼
                    ┌─────────────────┐
                    │  MongoDB Atlas  │
                    │     Database    │
                    └─────────────────┘
```

The React frontend communicates with the Vercel backend using the `VITE_API_URL` environment variable.

## Task Statuses

Tasks use the following status values:

```text
in-progress
completed
wont-do
todo
```

## Deployment

### Frontend

Build the React application:

```bash
npm run build
```

The production files are generated in:

```text
dist/
```

Deploy the `dist` directory to Netlify or connect the GitHub repository for automatic deployments.

For Netlify, set:

```text
VITE_API_URL=https://your-vercel-backend-url.vercel.app
```

### Backend

The Express backend is configured for Vercel.

Deploy using:

```bash
cd backend
npx vercel --prod
```

Set the MongoDB connection string as the Vercel environment variable:

```text
MONGO_URL
```

## Future Improvements

- User authentication
- Multiple users and private boards
- Drag-and-drop task management
- Task due dates
- Task priorities
- Search and filtering
- Board deletion from the UI
- Loading and error states
- Toast notifications
- Improved mobile experience

## License

This project is developed for learning and portfolio purposes.
