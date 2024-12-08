import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js"

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
        const quiz = await Quiz.findById(req.params.id).populate('questions');
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createQuiz = async (req, res) => {
    try {
        const creator = req.user.id;
        const { title, description, questions } = req.body;

        // Create the quiz
        const quiz = new Quiz({
            title,
            description,
            creator,
        });

        // Save the quiz first to get its ID
        const savedQuiz = await quiz.save();

        // Save each question with a reference to the quiz
        const questionIds = [];
        for (let question of questions) {
            const newQuestion = new Question({
                text: question.text,
                options: question.options,
                correctAnswer: question.correctAnswer,
                quiz: savedQuiz.id,
            });

            const savedQuestion = await newQuestion.save();
            questionIds.push(savedQuestion.id);
        }

        // Add the questions to the quiz
        savedQuiz.questions = questionIds;
        await savedQuiz.save();

        res.status(201).json(savedQuiz);
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
