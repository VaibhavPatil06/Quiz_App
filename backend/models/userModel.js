import mongoose from "mongoose";

const quizAttemptedSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quizResult: [],
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, unique: true, required: true }, // Set email to be unique and required
  password: {
    type: String,
    required: true,
  },
  Points: { type: Number, default: 0 }, // Set default value for Points
  quizAttempted: [quizAttemptedSchema],
});

const User = mongoose.model("User", userSchema);
export default User;
