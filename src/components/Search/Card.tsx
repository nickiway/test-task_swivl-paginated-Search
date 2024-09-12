import { Link } from "react-router-dom";

import { Card, Avatar, CardContent, Typography, Box } from "@mui/material";

import type { UserListItem } from "../../interfaces/user/search-item.interface";

interface Props {
  data: UserListItem;
}

export default function SearchCard({ data }: Props) {
  return (
    <Link to={`/user/${data.id}`}>
      <Card>
        <CardContent>
          <Box display={"flex"} justifyContent={"center"}>
            <Avatar
              src={data.avatar_url}
              alt="User's avatar"
              sx={{ width: 128, height: 128 }}
            />
          </Box>
          <Typography variant="body1" align="center">
            {data.login}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
