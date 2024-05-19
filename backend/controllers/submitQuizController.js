import User from "../models/userModel.js";

const submitQuiz = async (req, res) => {
  try {
    const userId = req.user._id;
    const { topic, score, total } = req.body;

    // Validate score
    const parsedScore = parseInt(score, 10);
    if (isNaN(parsedScore)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid score value" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create the new quizAttempt
    const quizAttempt = {
      quizId: userId,
      quizResult: [{ topic, score: parsedScore, total }],
    };

    // Add the new quizAttempt to the user's quizAttempted array
    user.quizAttempted.push(quizAttempt);

    // Update user points
    user.Points = user.Points + parsedScore;

    // Save the user
    await user.save();

    res.json({
      success: true,
      message: "Quiz result submitted successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { submitQuiz };
