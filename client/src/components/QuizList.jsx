import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Link,
} from "@mui/material";
import api from "../api";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/quizzes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, []);

  const handlePublish = async (quizId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/quizzes/${quizId}/publish`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz._id === quizId
            ? { ...quiz, isPublished: true, permalink: response.data.permalink }
            : quiz
        )
      );
    } catch (error) {
      console.error("Failed to publish quiz:", error);
    }
  };

  const handleDelete = async (quizId) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/quizzes/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz._id !== quizId)
      );
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" align="center" sx={{ mb: 4 }}>
        My Quizzes
      </Typography>
      {quizzes.map((quiz) => (
        <Card
          key={quiz._id}
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
            backgroundColor: "#f9f9fb",
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {quiz.title}
            </Typography>
            {!quiz.isPublished ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePublish(quiz._id)}
                sx={{ mt: 1, textTransform: "none" }}
              >
                Publish
              </Button>
            ) : (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    color: "success.main",
                    mt: 2,
                    fontWeight: "bold",
                  }}
                >
                  Published
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: "text.secondary",
                    wordBreak: "break-all",
                  }}
                >
                  <strong>Published Link: </strong>
                  <Link
                    href={`/public/${quiz.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    underline="hover"
                  >
                    {`/public/${quiz.permalink}`}
                  </Link>
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(quiz._id)}
                  sx={{
                    mt: 2,
                    textTransform: "none",
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default QuizList;
