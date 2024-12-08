import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Quiz = mongoose.model("Quiz", quizSchema);


export default Quiz;
