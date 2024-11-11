
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import QuizForm from "./components/QuizForm";

import NavBar from "./components/NavBar";//+

import PublicQuiz from "./components/PublicQuiz";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<DashboardPage />} />}
        />
        <Route
          path="/create"
          element={<PrivateRoute element={<QuizForm />} />}
        />
        <Route
          path="/public/:permalink"
          element={<PrivateRoute element={<PublicQuiz />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

