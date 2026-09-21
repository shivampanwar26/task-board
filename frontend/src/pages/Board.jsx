import { useEffect, useState } from "react";
import Logo from "../resources/Logo.svg";
import Edit from "../resources/Edit_duotone.svg";
import "../App.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Board() {
    const { id } = useParams();

    const [tasks, setTasks] = useState([]);
    const [board, setBoard] = useState(null);

    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showBoardForm, setShowBoardForm] = useState(false);

    const [editingTask, setEditingTask] = useState(null);

    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [taskIcon, setTaskIcon] = useState("📚");
    const [taskStatus, setTaskStatus] = useState("todo");

    const [boardName, setBoardName] = useState("");
    const [boardDescription, setBoardDescription] = useState("");

    // =========================
    // FETCH BOARD
    // =========================

    const fetchBoard = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/boards/${id}`
            );

            setBoard(response.data.board);
            setTasks(response.data.tasks);

        } catch (error) {
            console.error("Error fetching board:", error);
        }
    };

    useEffect(() => {
        fetchBoard();
    }, [id]);

    // =========================
    // CREATE DEFAULT TASK
    // =========================

    const createDefaultTask = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/api/tasks`,
                {
                    boardId: id,
                    name: "Untitled Task",
                    description: "",
                    icon: "📚",
                    status: "todo"
                }
            );

            setTasks((prevTasks) => [
                ...prevTasks,
                response.data
            ]);

        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    // =========================
    // OPEN TASK EDIT FORM
    // =========================

    const openEditForm = (task) => {
        setEditingTask(task);

        setTaskName(task.name);
        setTaskDesc(task.description || "");
        setTaskIcon(task.icon || "📚");
        setTaskStatus(task.status);

        setShowTaskForm(true);
    };

    // =========================
    // UPDATE TASK
    // =========================

    const updateTask = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `${API_URL}/api/tasks/${editingTask._id}`,
                {
                    name: taskName,
                    description: taskDesc,
                    icon: taskIcon,
                    status: taskStatus
                }
            );

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === editingTask._id
                        ? response.data
                        : task
                )
            );

            closeTaskForm();

        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // =========================
    // DELETE TASK
    // =========================

    const deleteTask = async () => {
        try {
            await axios.delete(
                `${API_URL}/api/tasks/${editingTask._id}`
            );

            setTasks((prevTasks) =>
                prevTasks.filter(
                    (task) => task._id !== editingTask._id
                )
            );

            closeTaskForm();

        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // =========================
    // CLOSE TASK FORM
    // =========================

    const closeTaskForm = () => {
        setShowTaskForm(false);
        setEditingTask(null);

        setTaskName("");
        setTaskDesc("");
        setTaskIcon("📚");
        setTaskStatus("todo");
    };

    // =========================
    // OPEN BOARD EDIT FORM
    // =========================

    const openBoardForm = () => {
        setBoardName(board.name);
        setBoardDescription(board.description || "");

        setShowBoardForm(true);
    };

    // =========================
    // UPDATE BOARD
    // =========================

    const updateBoard = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `${API_URL}/api/boards/${id}`,
                {
                    name: boardName,
                    description: boardDescription
                }
            );

            setBoard(response.data);

            setShowBoardForm(false);

        } catch (error) {
            console.error("Error updating board:", error);
        }
    };

    // =========================
    // LOADING
    // =========================

    if (!board) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">

            {/* =========================
                HEADER
            ========================= */}

            <div className="header">

                <h1>

                    <img
                        src={Logo}
                        className="logo"
                        alt="Logo"
                    />

                    {board.name}

                    <img
                        src={Edit}
                        className="edit"
                        alt="Edit board"
                        onClick={openBoardForm}
                    />

                </h1>

                <h3>
                    {board.description}
                </h3>

            </div>


            {/* =========================
                TASKS
            ========================= */}

            {tasks.map((task) => (

                <div
                    key={task._id}
                    className={`taskCard ${task.status}`}
                    onClick={() => openEditForm(task)}
                >

                    <h2>

                        <span>
                            {task.icon}
                        </span>

                        {task.name}

                    </h2>

                    {task.description && (
                        <p>
                            {task.description}
                        </p>
                    )}

                </div>

            ))}


            {/* =========================
                ADD NEW TASK
            ========================= */}

            <div
                className="cardAdd"
                onClick={createDefaultTask}
            >

                <h2>

                    <span>
                        ➕
                    </span>

                    Add New Task

                </h2>

            </div>


            {/* =========================
                EDIT TASK FORM
            ========================= */}

            {showTaskForm && editingTask && (

                <div className="formContainer">

                    <form
                        className="taskForm"
                        onSubmit={updateTask}
                    >

                        <div className="formHeader">

                            <h2>
                                Edit task
                            </h2>

                            <button
                                type="button"
                                className="closeButton"
                                onClick={closeTaskForm}
                            >
                                X
                            </button>

                        </div>


                        <label htmlFor="taskName">
                            Task name
                        </label>

                        <input
                            type="text"
                            id="taskName"
                            value={taskName}
                            onChange={(e) =>
                                setTaskName(e.target.value)
                            }
                            required
                        />


                        <label htmlFor="taskDesc">
                            Task description
                        </label>

                        <textarea
                            id="taskDesc"
                            value={taskDesc}
                            onChange={(e) =>
                                setTaskDesc(e.target.value)
                            }
                        />


                        <label>
                            Icon
                        </label>

                        <div className="icons">

                            {["👤", "💬", "☕", "🐱", "📚", "⏰"].map(
                                (icon) => (

                                    <button
                                        key={icon}
                                        type="button"
                                        className={
                                            taskIcon === icon
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={() =>
                                            setTaskIcon(icon)
                                        }
                                    >
                                        {icon}
                                    </button>

                                )
                            )}

                        </div>


                        <label>
                            Status
                        </label>

                        <div className="statusContainer">

                            <button
                                type="button"
                                className={`status ${
                                    taskStatus === "in-progress"
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() =>
                                    setTaskStatus("in-progress")
                                }
                            >
                                🕐 In Progress
                            </button>


                            <button
                                type="button"
                                className={`status ${
                                    taskStatus === "completed"
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() =>
                                    setTaskStatus("completed")
                                }
                            >
                                ✓ Completed
                            </button>


                            <button
                                type="button"
                                className={`status ${
                                    taskStatus === "wont-do"
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() =>
                                    setTaskStatus("wont-do")
                                }
                            >
                                × Won't do
                            </button>


                            <button
                                type="button"
                                className={`status ${
                                    taskStatus === "todo"
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() =>
                                    setTaskStatus("todo")
                                }
                            >
                                📝 To Do
                            </button>

                        </div>


                        <div className="taskActions">

                            <button
                                type="button"
                                className="deleteButton"
                                onClick={deleteTask}
                            >
                                Delete
                            </button>


                            <button
                                type="submit"
                                className="createTaskButton"
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* =========================
                EDIT BOARD FORM
            ========================= */}

            {showBoardForm && (

                <div className="formContainer">

                    <form
                        className="taskForm"
                        onSubmit={updateBoard}
                    >

                        <div className="formHeader">

                            <h2>
                                Edit board
                            </h2>

                            <button
                                type="button"
                                className="closeButton"
                                onClick={() =>
                                    setShowBoardForm(false)
                                }
                            >
                                X
                            </button>

                        </div>


                        <label htmlFor="boardName">
                            Board name
                        </label>

                        <input
                            type="text"
                            id="boardName"
                            value={boardName}
                            onChange={(e) =>
                                setBoardName(e.target.value)
                            }
                            required
                        />


                        <label htmlFor="boardDescription">
                            Board description
                        </label>

                        <textarea
                            id="boardDescription"
                            value={boardDescription}
                            onChange={(e) =>
                                setBoardDescription(e.target.value)
                            }
                        />


                        <button
                            type="submit"
                            className="createTaskButton"
                        >
                            Save Changes
                        </button>

                    </form>

                </div>

            )}

        </div>
    );
}

export default Board;