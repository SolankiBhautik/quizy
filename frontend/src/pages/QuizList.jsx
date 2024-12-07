import React, { useEffect, useState } from "react";
import QuizList from "../components/QuizList";

function Quiz() {
    return (
        <div className="quiz-list-page">
            <h1>Quizzes</h1>
            <QuizList />
        </div>
    );
}

export default Quiz;
