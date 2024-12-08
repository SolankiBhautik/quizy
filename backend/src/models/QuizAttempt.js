import mongoose from "mongoose";

const QuizAttemptSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, default: 0 },
    answers: [{
        question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
        selectedOption: { type: Number, required: true },
    }],
    completedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const QuizAttempt = mongoose.model('QuizAttempt', QuizAttemptSchema);
export default QuizAttempt;