import { useState, useEffect, useCallback } from "react";
import { User } from "../interfaces/user/user.interface";
import { getUserById } from "../api/users";

interface UseFetchUserResult {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export default function useFetchUser(id: number): UseFetchUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!id) {
      setError("Invalid user ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getUserById(id);
      setUser(response.data);
    } catch (err) {
      setError("Failed to fetch user");
      console.error("Fetch user error:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error };
}
