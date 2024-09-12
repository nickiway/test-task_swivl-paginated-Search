import { useState, useEffect } from "react";

import { User } from "../interfaces/user/user.interface";
import { getUserById } from "../api/users";

export default function useFetchUser(id: number) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: User = (await getUserById(id)).data;
        setUser(response);
      } catch (e) {
        setError("Failed to fetch user data");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { user, loading, error };
}
