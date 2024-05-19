import Quiz from "../models/quizdata.model.js";

const addQuiz = async (req, res) => {
  const { title, questionArray } = req.body;
  try {
    const newQuiz = new Quiz({
      title,
      questionArray,
    });
    console.log(newQuiz);
    await newQuiz.save();
    res.status(201).json({ success: true, message: "Quiz added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addQuiz };
