import express from "express";
import { addQuiz } from "../controllers/quizController.js";
import { getQuizQuestions } from "../controllers/getquizController.js";
import { getAllTitles } from "../controllers/titleController.js";
import authMiddleware from "../middleware/auth.js";
import { submitQuiz } from "../controllers/submitQuizController.js";
const router = express.Router();

// Route to add a new quiz
router.post("/add", addQuiz);
router.post("/title", getAllTitles);
router.post("/get", getQuizQuestions);
router.post("/submit", authMiddleware, submitQuiz);

export default router;
