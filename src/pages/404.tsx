import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import { ErrorOutline as ErrorOutlineIcon } from "@mui/icons-material";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#f5f5f5",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: "#f44336" }} />
      <Typography variant="h4" sx={{ marginTop: 2, fontWeight: "bold" }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Link to="/">
        <Button variant="contained" color="primary" sx={{ marginTop: 3 }}>
          Go Back to Home
        </Button>
      </Link>
    </Box>
  );
}
