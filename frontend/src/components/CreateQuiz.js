import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [level, setLevel] = useState("");
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newQuiz = { name, position, level };
            await axios.post(`${BACKEND_URL}/quiz`, newQuiz);
            alert("Quiz created successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error creating quiz:", error);
            alert("Failed to create quiz. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Create New Quiz</h2>
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Quiz Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="position" className="block text-gray-700 font-bold mb-2">Position</label>
                    <input
                        type="text"
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="level" className="block text-gray-700 font-bold mb-2">Level</label>
                    <input
                        type="text"
                        id="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Create Quiz
                </button>
            </form>
        </div>
    );
}

export default CreateQuiz;

