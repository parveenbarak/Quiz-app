const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswers: [{ type: String, required: true }],
  questionType: { type: String, required: true, enum: ["single", "multiple"] },
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema],
  permalink: { type: String, unique: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isPublished: { type: Boolean, default: false },
});

module.exports = mongoose.model("Quiz", QuizSchema);
