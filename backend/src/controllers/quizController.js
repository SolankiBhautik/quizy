import Quiz from "../models/Quiz.js";

// Get all quizzes
export const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single quiz by ID
export const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new quiz
export const createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz({
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        });
        const newQuiz = await quiz.save();
        res.status(201).json(newQuiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a quiz by ID
export const updateQuiz = async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }  // Return the updated quiz
        );
        if (!updatedQuiz) return res.status(404).json({ message: "Quiz not found" });
        res.status(200).json(updatedQuiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a quiz by ID
export const deleteQuiz = async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!deletedQuiz) return res.status(404).json({ message: "Quiz not found" });
        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
