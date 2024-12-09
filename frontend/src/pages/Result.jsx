import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Result() {
    const location = useLocation();
    const [payload, setPayload] = useState(null);

    useEffect(() => {
        if (location.state) {
            setPayload(location.state);
        }
    }, [location.state]);

    if (!payload) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Quiz Result</h1>
            <p className="text-lg mb-4">You scored {payload.score} out of {payload.totalQuestions}</p>
            <p className="text-lg mb-4">Time taken: {payload.timeTaken} minutes</p>
        </div>
    );
}

export default Result;
