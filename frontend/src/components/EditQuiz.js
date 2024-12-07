import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";


function EditQuiz() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [level, setLevel] = useState("");
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/quiz/${id}`)
            .then((response) => {
                const quiz = response.data;
                setName(quiz.name);
                setPosition(quiz.position);
                setLevel(quiz.level);
            })
            .catch((error) => {
                console.error("Error fetching quiz:", error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedQuiz = { name, position, level };

        axios
            .patch(`http://localhost:5050/quiz/${id}`, updatedQuiz)
            .then((response) => {
                alert("Quiz updated successfully!");
                navigate.push("/"); // Navigate back to the quiz list
            })
            .catch((error) => {
                console.error("Error updating quiz:", error);
            });
    };

    return (
        <div>
            <h2>Edit Quiz</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Quiz Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    required
                />
                <button type="submit">Update Quiz</button>
            </form>
        </div>
    );
}

export default EditQuiz;
