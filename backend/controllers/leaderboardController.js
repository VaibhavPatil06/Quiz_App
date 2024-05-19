import User from "../models/userModel.js";

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({}, "name Points quizAttempted")
      .populate("quizAttempted.quizId", "title")
      .exec();

    const leaderboardData = users
      .map((user) => {
        const quizzesAttempted = user.quizAttempted.length;
        const totalScore = user.quizAttempted.reduce(
          (acc, quiz) =>
            acc +
            quiz.quizResult.reduce(
              (scoreAcc, result) => scoreAcc + result.score,
              0
            ),
          0
        );

        const quizDetails = user.quizAttempted.map((quiz) => ({
          quizTitle: quiz.quizResult.map((result) => result.topic).join(", "),
          attempts: quiz.quizResult.length,
          scores: quiz.quizResult.map((result) => ({
            topic: result.topic,
            score: result.score,
          })),
        }));

        return {
          name: user.name,
          quizzesAttempted,
          totalScore,
          quizDetails,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore); // Sort by total score in descending order

    res.status(200).json(leaderboardData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
