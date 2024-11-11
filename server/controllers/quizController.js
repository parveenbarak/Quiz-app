const Quiz = require("../models/Quiz");
const { v4: uuidv4 } = require("uuid");

exports.createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const quiz = await Quiz.create({
      title,
      questions,
      author: req.user.id,
      isPublished: false,
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ author: req.user.id });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.publishQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

  
    if (quiz.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }


    if (quiz.isPublished) {
      return res.status(400).json({ error: "Quiz is already published" });
    }

  
    quiz.permalink = uuidv4().slice(0, 6); 
    quiz.isPublished = true;
    await quiz.save();

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete quiz", error });
  }
};

exports.getQuizByPermalink = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      permalink: req.params.permalink,
      isPublished: true,
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found or not published" });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      permalink: req.params.permalink,
      isPublished: true,
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found or not published" });
    }

    const { answers } = req.body;
    let correctAnswersCount = 0;

  
    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index];

      if (question.questionType === "single") {
       
        if (userAnswer && userAnswer[0] === question.correctAnswers[0]) {
          correctAnswersCount++;
        }
      } else if (question.questionType === "multiple") {
        
        const correctAnswerSet = new Set(question.correctAnswers);
        const userAnswerSet = new Set(userAnswer);
        if (
          userAnswerSet.size === correctAnswerSet.size &&
          [...userAnswerSet].every((answer) => correctAnswerSet.has(answer))
        ) {
          correctAnswersCount++;
        }
      }
    });

    res.json({
      score: `${correctAnswersCount}/${quiz.questions.length}`,
      message: `You answered ${correctAnswersCount} out of ${quiz.questions.length} questions correctly`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
