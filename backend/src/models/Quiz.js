import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    time: { type: Number },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
}, { timestamps: true });

const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;
