import { Link } from "react-router-dom";

import { Grid2 as Grid, Avatar, Typography, Paper, Box } from "@mui/material";

import type { User } from "../../interfaces/user/user.interface";

interface Props {
  user: User;
}

export default function UserDetailsCard({ user }: Props) {
  return (
    <Box className="centered">
      <Paper sx={{ width: "800px", padding: "10px" }}>
        <Grid container spacing={2}>
          <Grid size={"auto"}>
            <Avatar
              src={user.avatar_url}
              variant="rounded"
              sx={{ width: 256, height: 256 }}
            />
          </Grid>
          <Grid container size={"grow"}>
            <Grid size={12}>
              <Typography variant="h4">{user.name}</Typography>
            </Grid>

            <Grid size={12}>
              <Typography variant="body1">
                Number of followers: {user.followers}
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography variant="body1">
                Blog link:{" "}
                <Link to={user.blog} target="_blank">
                  Blog
                </Link>
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography variant="body1">
                Following: {user.following}
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography variant="body1">Company: {user.company}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
