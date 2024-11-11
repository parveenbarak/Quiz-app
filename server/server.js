const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const connectDB = require("./config/db");

dotenv.config();
const app = express();


connectDB();


app.use(
  cors()
);
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
