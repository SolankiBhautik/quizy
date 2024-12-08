import React from "react";
import { Link } from "react-router";
import axios from "axios";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";



function QuizCard({ quiz, onDelete }) {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this quiz?")) {
            try {
                await axios.delete(`${BACKEND_URL}/quiz/${quiz._id}`);
                alert("Quiz deleted successfully!");
                onDelete();
            } catch (error) {
                console.error("Error deleting quiz:", error);
                alert("Failed to delete quiz. Please try again.");
            }
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">{quiz.name}</h3>
            <p className="text-gray-600 mb-1">Position: {quiz.position}</p>
            <p className="text-gray-600 mb-4">Level: {quiz.level}</p>
            <div className="flex justify-between items-center">
                <Link
                    to={`/edit/${quiz._id}`}
                    className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300"
                >
                    <PencilIcon className="w-5 h-5 mr-1" />
                    Edit
                </Link>
                <button
                    onClick={handleDelete}
                    className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                    <TrashIcon className="w-5 h-5 mr-1" />
                    Delete
                </button>
            </div>
        </div>
    );
}

export default QuizCard;

