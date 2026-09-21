import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
    const navigate = useNavigate();

    const createBoard = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/api/boards`,
                {
                    name: "My Task Board",
                    description: "Tasks to keep organised"
                }
            );

            const board = response.data.board;

            navigate(`/boards/${board._id}`);
        } catch (error) {
            console.error("Error creating board:", error);
            console.error("Backend response:", error.response?.data);
        }
    };

    useEffect(() => {
        createBoard();
    }, []);

    return <div>Creating board...</div>;
}