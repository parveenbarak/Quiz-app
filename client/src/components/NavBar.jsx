import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100vw",
        top: 0,
        left: 0,
        zIndex: 1200,
        backgroundColor: "#1976d2",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Quiz App
        </Typography>
        {isAuthenticated ? (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/dashboard"
              sx={{
                mx: 1,
                ":hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/create"
              sx={{
                mx: 1,
                ":hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Create Quiz
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                mx: 1,
                ":hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                mx: 1,
                ":hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/register"
              sx={{
                mx: 1,
                ":hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
