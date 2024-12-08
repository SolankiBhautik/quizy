import express from "express";
import { getQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz } from "../controllers/quizController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router = express.Router();

// Get all quizzes
router.get("/", getQuizzes);

// Get a quiz by ID
router.get("/:id", getQuizById);

// Create a new quiz
router.post("/", authenticateToken, createQuiz);

// Update a quiz by ID
router.patch("/:id", authenticateToken, updateQuiz);

// Delete a quiz by ID
router.delete("/:id", authenticateToken, deleteQuiz);

export default router;
