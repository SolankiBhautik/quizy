import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router";
import QuizCard from "./QuizCard";

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/quiz`)
            .then((response) => {
                setQuizzes(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching quizzes!", error);
            });
    }, []);

    return (
        <div id="component-quizlist">
            <NavLink to="/create">Create New Quiz</NavLink >
            <div>
                {quizzes.map((quiz) => (
                    <QuizCard key={quiz._id} quiz={quiz} />
                ))}
            </div>
        </div>
    );
}

export default QuizList;
