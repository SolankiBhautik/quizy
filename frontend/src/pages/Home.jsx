import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome to the Quiz App</h1>
            <p className="text-xl mb-8">Test your knowledge and improve your skills with our quizzes!</p>
            <div className="space-x-4 mb-3">
                <Link to="/quizzes" className="btn btn-primary">
                    Start a Quiz
                </Link>
                <Link to="/register" className="btn btn-secondary">
                    Create an Account
                </Link>
            </div>
        </div>
    );
}

export default Home;

