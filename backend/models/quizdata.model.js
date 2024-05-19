import mongoose from "mongoose";

const { Schema, model } = mongoose;

const optionSchema = new Schema({
  option: { type: String },
  isCorrect: { type: Boolean },
  id: { type: Number },
});

const questionSchema = new Schema({
  title: { type: String },
  questions: { type: String },
  options: [optionSchema],
  correctAnswer: { type: String },
});

const quizSchema = new Schema({
  title: { type: String },
  questionArray: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
console.log("option" + optionSchema);
console.log("question" + questionSchema);
const Quiz = model("Quiz", quizSchema);

export default Quiz;
