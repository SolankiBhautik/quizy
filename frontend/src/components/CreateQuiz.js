import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


function CreateQuiz() {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [level, setLevel] = useState("");
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

    const handleSubmit = (e) => {
        e.preventDefault();

        const newQuiz = { name, position, level };

        axios
            .post(`${BACKEND_URL}/quiz`, newQuiz)
            .then((response) => {
                alert("Quiz created successfully!");
                navigate.push("/"); // Navigate back to the quiz list
            })
            .catch((error) => {
                console.error("Error creating quiz:", error);
            });
    };

    return (
        <div>
            <h2>Create New Quiz</h2>
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
                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
}

export default CreateQuiz;
