import Quiz from "../models/quizdata.model.js";

// Controller function to get all titles from the database
const getAllTitles = async (req, res) => {
  try {
    // Fetch all titles from the database
    const titles = await Quiz.find({}, "title"); // Assuming the Quiz model has a 'title' field

    res.json(titles);
  } catch (error) {
    console.error("Failed to fetch titles:", error);
    res.status(500).json({ error: "Failed to fetch titles" });
  }
};

export { getAllTitles };
