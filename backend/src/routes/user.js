import express from "express";
import { getUser, updateUser } from "../controllers/UserController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router = express.Router();


// Get a current User
router.get("/", authenticateToken, getUser);

// Update a User by ID
router.patch("/", authenticateToken, updateUser);

export default router;
