import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f4f8",
        padding: 4,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 600,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ color: "primary.main" }}>
          Welcome to Quiz App
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 3, color: "text.secondary" }}>
          Create, share, and take quizzes with ease.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/dashboard")}
          sx={{ marginBottom: 2, paddingX: 3, textTransform: "none" }}
        >
          Go to Dashboard
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/public/sample-quiz")}
          sx={{ textTransform: "none" }}
        >
          Try a Sample Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
