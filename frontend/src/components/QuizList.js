import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import QuizCard from "./QuizCard";

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/quiz`);
            setQuizzes(response.data);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
            <Link to="/quiz/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 inline-block">
                Create New Quiz
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                    <Link to={`/quiz/${quiz._id}`} key={quiz._id}>
                        <QuizCard quiz={quiz} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default QuizList;
