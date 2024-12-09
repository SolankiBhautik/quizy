import React, { useState, useEffect } from "react";
import axios from "../utils/AxiosInterceptor";
import { useParams, useNavigate } from "react-router-dom";

function QuizDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [quizTime, setQuizTime] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        fetchQuizDetail();
    }, [id]);

    useEffect(() => {
        let timer;
        if (isStarted && quizTime) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        finishQuiz();
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isStarted, quizTime]);

    const fetchQuizDetail = async () => {
        try {
            const response = await axios.get(`/quiz/${id}`);
            setQuiz(response.data);
            setQuizTime(response.data.time ? response.data.time * 60 : null);
            setTimeLeft(response.data.time ? response.data.time * 60 : null);
        } catch (error) {
            console.error("Error fetching quiz detail:", error);
        }
    };

    const startQuiz = () => {
        setIsStarted(true);
    };

    const finishQuiz = () => {
        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                score += 1;
            }
        });
        const timeTaken = quizTime - timeLeft;

        const payload = {
            score: score,
            totalQuestions: quiz.questions.length,
            timeTaken: (timeTaken / 60).toFixed(2),
            quiz: quiz
        };

        navigate(`/quiz/${id}/result`, { state: payload });
    };

    const handleAnswerSelection = (optionIndex) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestionIndex]: optionIndex,
        }));
    };

    const handlePrevuesQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            finishQuiz();
        }
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex mb-4">
                <h1 className="text-3xl font-bold">{quiz.title}</h1>
                {!isStarted && (
                    <button className="btn btn-primary h-fit ml-auto" onClick={startQuiz}>
                        Start
                    </button>
                )}
            </div>
            {!isStarted ? (
                <>
                    <p className="text-lg mb-4">{quiz.description}</p>
                    <p className="text-lg mb-4">
                        Time: {quizTime ? `${quizTime / 60} Minutes` : "No time limit"}
                    </p>
                </>
            ) : (
                <div>
                    {quizTime && (
                        <p className="text-lg mb-4">
                            Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                        </p>
                    )}
                    <div>
                        <h2 className="text-xl font-bold mb-2">
                            Question {currentQuestionIndex + 1} of {quiz.questions.length}
                        </h2>
                        <p className="mb-4">{quiz.questions[currentQuestionIndex].text}</p>
                        <ul className="space-y-2">
                            {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                                <li key={index}>
                                    <button
                                        className={`btn w-full text-left ${selectedAnswers[currentQuestionIndex] === index
                                            ? "bg-gray-200"
                                            : ""
                                            }`}
                                        onClick={() => handleAnswerSelection(index)}
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            className="btn btn-secondary"
                            onClick={handlePrevuesQuestion}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleNextQuestion}
                        >
                            {currentQuestionIndex === quiz.questions.length - 1 ? "Finish" : "Next"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizDetail;
