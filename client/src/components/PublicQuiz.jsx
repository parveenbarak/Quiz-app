import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
} from "@mui/material";
import api from "../api";
import { useParams } from "react-router-dom";

const PublicQuiz = () => {
  const { permalink } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(`/quizzes/public/${permalink}`);
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [permalink]);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post(`/quizzes/public/${permalink}/submit`, {
        answers,
      });
      alert(`You scored ${response.data.score}!`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (!quiz) return <Typography variant="h6">Loading...</Typography>;

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        my: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        {quiz.title}
      </Typography>
      {quiz.questions.map((question, index) => (
        <Card
          key={index}
          sx={{
            marginBottom: 3,
            borderRadius: 2,
            boxShadow: 1,
            backgroundColor: "#ffffff",
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {question.questionText}
            </Typography>
            {question.questionType === "single" ? (
              <FormControl component="fieldset">
                <RadioGroup
                  name={`question-${index}`}
                  value={answers[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                >
                  {question.options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ) : (
              <FormControl component="fieldset">
                <FormGroup>
                  {question.options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      control={<Checkbox />}
                      label={option}
                      onChange={(e) => {
                        const updatedAnswers = [...answers];
                        if (e.target.checked) {
                          updatedAnswers[index] = [
                            ...(updatedAnswers[index] || []),
                            option,
                          ];
                        } else {
                          updatedAnswers[index] = updatedAnswers[index]?.filter(
                            (ans) => ans !== option
                          );
                        }
                        setAnswers(updatedAnswers);
                      }}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            )}
          </CardContent>
        </Card>
      ))}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            width: "50%",
            ":hover": {
              backgroundColor: "#1976d2",
            },
          }}
        >
          Submit Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default PublicQuiz;
