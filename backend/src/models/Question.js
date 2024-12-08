import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    text: { type: String, required: true },
    options: [{ type: String }],
    correctAnswer: { type: Number, required: true },
}, { timestamps: true });


const Question = mongoose.model("Question", QuestionSchema);
export default Question;
