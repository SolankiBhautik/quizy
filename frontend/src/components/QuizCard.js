import React from "react";



function QuizCard({ quiz }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
            <p className="text-gray-600 mb-1">Description: {quiz.description}</p>
        </div>
    );
}

export default QuizCard;

