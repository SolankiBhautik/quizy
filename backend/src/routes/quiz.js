import express from "express";
import { getQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz } from "../controllers/quizController.js";

const router = express.Router();

// Get all quizzes
router.get("/", getQuizzes);

// Get a quiz by ID
router.get("/:id", getQuizById);

// Create a new quiz
router.post("/", createQuiz);

// Update a quiz by ID
router.patch("/:id", updateQuiz);

// Delete a quiz by ID
router.delete("/:id", deleteQuiz);

export default router;
