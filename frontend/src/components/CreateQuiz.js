import React, { useState } from "react";
import axios from "../utils/AxiosInterceptor";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState();
    const [questions, setQuestions] = useState([
        { text: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    // Add a new question
    const addQuestion = () => {
        setQuestions([...questions, { text: "", options: ["", "", "", ""], correctAnswer: 0 }]);
    };

    // Update a question's details
    const updateQuestion = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    // Update an option for a specific question
    const updateOption = (qIndex, optIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[optIndex] = value;
        setQuestions(updatedQuestions);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newQuiz = { title, description, questions };
            await axios.post(`${BACKEND_URL}/quiz`, newQuiz);
            navigate("/quiz");
        } catch (error) {
            console.error("Error creating quiz:", error.response.data.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Create New Quiz</h2>
            <form onSubmit={handleSubmit} className="max-w-2xl">
                {/* Quiz Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                        Quiz Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Quiz Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Quiz Time */}
                <div className="mb-4">
                    <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
                        Time (in minutes)
                    </label>
                    <input
                        type="number"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(Number(e.target.value))}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={1} // Minimum of 1 minute
                    />
                </div>

                {/* Questions */}
                {questions.map((question, qIndex) => (
                    <div key={qIndex} className="mb-6 border p-4 rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold mb-2">Question {qIndex + 1}</h3>

                        {/* Question Text */}
                        <div className="mb-2">
                            <label className="block text-gray-700 font-bold mb-1">
                                Question Text
                            </label>
                            <input
                                type="text"
                                value={question.text}
                                onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Options */}
                        {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="mb-2">
                                <label className="block text-gray-600 font-medium mb-1">
                                    Option {optIndex + 1}
                                </label>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) =>
                                        updateOption(qIndex, optIndex, e.target.value)
                                    }
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}

                        {/* Correct Answer */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">
                                Correct Answer
                            </label>
                            <select
                                value={question.correctAnswer}
                                onChange={(e) =>
                                    updateQuestion(qIndex, "correctAnswer", parseInt(e.target.value))
                                }
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {question.options.map((_, optIndex) => (
                                    <option key={optIndex} value={optIndex}>
                                        Option {optIndex + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}

                {/* Add Question Button */}
                <button
                    type="button"
                    onClick={addQuestion}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-6"
                >
                    Add Question
                </button>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create Quiz
                </button>
            </form>
        </div>
    );
}

export default CreateQuiz;
