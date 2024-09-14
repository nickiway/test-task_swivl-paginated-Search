import { useNavigate, useParams } from "react-router-dom";

import useFetchUser from "../hooks/useFetchUser";

import { Typography } from "@mui/material";
import UserDetailsCard from "../components/Details/Card";
import { Loader } from "../components/shared/Loader";

import type { User } from "../interfaces/user/user.interface";

export default function User() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const numericId = id ? Number(id) : NaN;

  if (isNaN(numericId)) navigate("/");

  const { loading, user, error } = useFetchUser(numericId);

  if (loading) return <Loader />;

  if (error || !user)
    return (
      <Typography color="error" variant="h6" align="center">
        {error ?? "Something went wrong"}
      </Typography>
    );

  return <UserDetailsCard user={user} />;
}
