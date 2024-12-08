import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function QuizDetail() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        fetchQuizDetail();
    }, [id]);

    const fetchQuizDetail = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/quiz/${id}`);
            setQuiz(response.data);
        } catch (error) {
            console.error("Error fetching quiz detail:", error);
        }
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
            <p className="text-lg mb-4">{quiz.description}</p>
            <div>
                {/* Add any other quiz details here */}
                <h3 className="text-xl font-semibold">Questions:</h3>
                <ul>
                    {quiz.questions.map((question, index) => (
                        <li key={index} className="mb-4">
                            <div className="font-bold text-lg">{question.text}</div>
                            <ul className="list-disc pl-5">
                                {question.options.map((option, optionIndex) => (
                                    <li key={optionIndex} className="text-md">
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
}

export default QuizDetail;
