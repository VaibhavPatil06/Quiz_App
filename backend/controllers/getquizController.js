// quizController.js

import Quiz from "../models/quizdata.model.js";

// Handler for fetching quiz questions based on the selected topic title
export const getQuizQuestions = async (req, res) => {
  const { title } = req.body; // Access the topic title directly from req.body

  try {
    // Fetch quiz questions from the database based on the selected topic title
    const quiz = await Quiz.findOne({ title });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Extract and send the questions to the client
    const questions = quiz.questionArray;
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
