import React from "react";
import { NavLink } from "react-router";
import axios from "axios";


function QuizCard({ quiz }) {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

    const handleDelete = () => {
        axios
            .delete(`${BACKEND_URL}/quiz/${quiz._id}`)
            .then((response) => {
                alert("Quiz deleted successfully!");
                window.location.reload(); // Refresh the list
            })
            .catch((error) => {
                console.error("Error deleting quiz:", error);
            });
    };

    return (
        <div>
            <h3>{quiz.name}</h3>
            <p>Position: {quiz.position}</p>
            <p>Level: {quiz.level}</p>
            <NavLink to={`/edit/${quiz._id}`}>Edit</NavLink>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default QuizCard;
