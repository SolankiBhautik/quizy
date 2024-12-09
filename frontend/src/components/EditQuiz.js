import React, { useState, useEffect } from "react";
import axios from "../utils/AxiosInterceptor";
import { useParams, useNavigate } from "react-router-dom";

function EditQuiz() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuiz();
    }, [id]);

    const fetchQuiz = async () => {
        try {
            const response = await axios.get(`/quiz/${id}`);
            const quiz = response.data;
            setName(quiz.name);
        } catch (error) {
            console.error("Error fetching quiz:", error);
            alert("Failed to fetch quiz details. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedQuiz = { name };
            await axios.patch(`/quiz/${id}`, updatedQuiz);
            alert("Quiz updated successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error updating quiz:", error);
            alert("Failed to update quiz. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Edit Quiz</h2>
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
                =
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Update Quiz
                </button>
            </form>
        </div>
    );
}

export default EditQuiz;

