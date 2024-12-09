import express from "express";
import { register, login, check } from "../controllers/authController.js";


const router = express.Router();

router.post("/register", register)

router.post("/login", login)

router.get("/check", check)

export default router;