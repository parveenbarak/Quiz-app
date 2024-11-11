import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import api from "../api";
import { useNavigate } from "react-router-dom";

const QuizForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", ""],
        correctAnswers: [],
        questionType: "single",
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    await api.post(
      "/quizzes",
      { title, questions },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    navigate("/quizzes");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 5,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f7f9fc",
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Create Quiz
      </Typography>
      <TextField
        label="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ mb: 3 }}
      />
      {questions.map((question, index) => (
        <Box key={index} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 1 }}>
          <TextField
            label={`Question ${index + 1}`}
            value={question.questionText}
            onChange={(e) =>
              updateQuestion(index, "questionText", e.target.value)
            }
            fullWidth
            margin="normal"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" sx={{ mb: 1 }}>
            Options
          </Typography>
          {question.options.map((option, optIndex) => (
            <TextField
              key={optIndex}
              value={option}
              onChange={(e) => {
                const newOptions = [...question.options];
                newOptions[optIndex] = e.target.value;
                updateQuestion(index, "options", newOptions);
              }}
              fullWidth
              margin="dense"
              sx={{ mb: 1 }}
            />
          ))}
          <Button
            onClick={() =>
              updateQuestion(index, "options", [...question.options, ""])
            }
            sx={{
              textTransform: "none",
              mb: 2,
              ":hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Add Option
          </Button>
          <Box display="flex" gap={2} mt={2}>
            <Button
              variant="contained"
              color={question.questionType === "single" ? "primary" : "default"}
              onClick={() => updateQuestion(index, "questionType", "single")}
              sx={{ textTransform: "none" }}
            >
              Single Answer
            </Button>
            <Button
              variant="contained"
              color={
                question.questionType === "multiple" ? "primary" : "default"
              }
              onClick={() => updateQuestion(index, "questionType", "multiple")}
              sx={{ textTransform: "none" }}
            >
              Multiple Answers
            </Button>
          </Box>
        </Box>
      ))}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button
          variant="outlined"
          onClick={addQuestion}
          sx={{
            textTransform: "none",
            ":hover": {
              backgroundColor: "#e0f2f1",
            },
          }}
        >
          Add Question
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ textTransform: "none" }}
        >
          Create Quiz
        </Button>
      </Box>
    </Container>
  );
};

export default QuizForm;
