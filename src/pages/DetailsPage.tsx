import { useNavigate, useParams } from "react-router-dom";

import useFetchUser from "../hooks/useFetchUser";

import type { User } from "../interfaces/user/user.interface";
import UserDetailsCard from "../components/Details/Card";

export default function User() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const numericId = id ? Number(id) : NaN;

  if (isNaN(numericId)) navigate("/");

  const { loading, user, error } = useFetchUser(numericId);

  if (loading) return "loading";
  if (error) return error;
  if (!user) return "Something went wrong";

  return <UserDetailsCard user={user} />;
}
