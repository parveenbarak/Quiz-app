const express = require("express");
const {
  createQuiz,
  getQuizzes,
  publishQuiz,
  deleteQuiz,
  getQuizByPermalink,
  submitQuiz,

} = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createQuiz);


router.get("/", protect, getQuizzes);




router.post("/:id/publish", protect, publishQuiz);


router.delete("/:id", protect, deleteQuiz);


router.get("/public/:permalink", getQuizByPermalink);


router.post("/public/:permalink/submit", submitQuiz);

module.exports = router;
