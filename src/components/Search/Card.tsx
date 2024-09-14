import { Link } from "react-router-dom";
import { Card, Avatar, CardContent, Typography, Box } from "@mui/material";

import type { UserListItem } from "../../interfaces/user/search-item.interface";

interface Props {
  data: UserListItem;
}

export default function SearchCard({ data }: Props) {
  const { id, avatar_url, login } = data;
  const link = id ? `/user/${id}` : "/";

  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            transform: "translateY(-4px)",
          },
          "& .MuiCardContent-root": {
            padding: "16px",
          },
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              src={avatar_url}
              alt={`${login}'s avatar`}
              sx={{
                width: 128,
                height: 128,
              }}
            />
          </Box>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: "#333",
              fontWeight: 600,
              fontSize: "1.25rem",
              lineHeight: "1.5",
            }}
          >
            {login}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
