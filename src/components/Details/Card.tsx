import { Link } from "react-router-dom";
import {
  Grid2 as Grid,
  Avatar,
  Typography,
  Paper,
  Box,
  Button,
} from "@mui/material";
import type { User } from "../../interfaces/user/user.interface";

interface Props {
  user: User;
}

export default function UserDetailsCard({ user }: Props) {
  const { avatar_url, name, followers, blog, following, company } = user;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Paper
        sx={{
          width: "800px",
          padding: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          transition: "transform 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Avatar
              src={avatar_url}
              alt={`${name}'s avatar`}
              variant="rounded"
              sx={{
                width: "256px",
                height: "256px",
                borderRadius: "12px",
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }} container direction="column">
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: "16px" }}
            >
              {name || "Unknown User"}
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
              Number of followers: {followers ?? 0}
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
              Blog link:{" "}
              {blog ? (
                <a
                  href={blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1976d2", textDecoration: "none" }}
                >
                  Visit Blog
                </a>
              ) : (
                "No Blog"
              )}
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
              Following: {following ?? 0}
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
              Company: {company || "Not Available"}
            </Typography>
          </Grid>
        </Grid>

        <Link to="/">
          <Button variant="contained" fullWidth sx={{ marginTop: "20px" }}>
            Go Back
          </Button>
        </Link>
      </Paper>
    </Box>
  );
}
