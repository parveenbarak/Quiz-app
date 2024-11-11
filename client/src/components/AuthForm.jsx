import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response =
        mode === "login"
          ? await api.post("/auth/login", { email, password })
          : await api.post("/auth/register", { email, password });

      if (mode === "login") {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 10,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        {mode === "login" ? "Login" : "Register"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            ":hover": {
              backgroundColor: "#1976d2",
            },
          }}
        >
          {mode === "login" ? "Login" : "Register"}
        </Button>
      </form>
    </Box>
  );
};

export default AuthForm;
